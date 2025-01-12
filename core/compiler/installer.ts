import * as sudoPrompt from 'sudo-prompt';
import * as childProcess from 'child_process';
import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';
import rimraf from 'rimraf';
import {getDocumentsFolder} from 'platform-folders';


import ArduinoCompiler, { InstallInfo } from './compiler';
import * as util from './util';
import logger from "../files/logger";
import {isNewer} from "./util";
import {CLI} from "./cli";

export default class Installer {
  private readonly PLATFORM: string;

  private readonly downloads = {
    arduino: {
      Windows_NT: 'https://downloads.arduino.cc/arduino-1.8.12-windows.exe',
      Linux_x32: 'https://downloads.arduino.cc/arduino-1.8.12-linux32.tar.xz',
      Linux_x64: 'https://downloads.arduino.cc/arduino-1.8.12-linux64.tar.xz',
      Darwin: 'https://downloads.arduino.cc/arduino-1.8.12-macosx.zip',
      Darwin_Driver: 'https://www.silabs.com/documents/public/software/Mac_OSX_VCP_Driver.zip'
    },

    arduino_cli: {
      Windows_NT_x32:
        'https://github.com/arduino/arduino-cli/releases/download/0.18.1/arduino-cli_0.18.1_Windows_32bit.zip',
      Windows_NT_x64:
        'https://github.com/arduino/arduino-cli/releases/download/0.18.1/arduino-cli_0.18.1_Windows_64bit.zip',
      Linux_x32:
        'https://github.com/arduino/arduino-cli/releases/download/0.18.1/arduino-cli_0.18.1_Linux_32bit.tar.gz',
      Linux_x64:
        'https://github.com/arduino/arduino-cli/releases/download/0.18.1/arduino-cli_0.18.1_Linux_64bit.tar.gz',
      Darwin: 'https://github.com/arduino/arduino-cli/releases/download/0.18.1/arduino-cli_0.18.1_macOS_64bit.tar.gz'
    },

    ringo: {
      manager:
        'https://raw.githubusercontent.com/CircuitMess/Arduino-Packages/master/package_circuitmess.com_esp32_index.json',
      fqbn: 'cm:esp32',
      library: 'https://github.com/CircuitMess/CircuitMess-Ringo/archive/master.zip'
    },

    nibble: {
        manager: 'https://raw.githubusercontent.com/CircuitMess/Arduino-Packages/master/package_circuitmess.com_esp8266_index.json',
        fqbn: 'cm:esp8266'
    }
  };

  private readonly versions = {
      library: 'https://raw.githubusercontent.com/CircuitMess/CircuitMess-Ringo/master/library.properties',
      cli: '0.18.1',
      arduino: '1.8.12'
  };

  constructor() {
    this.PLATFORM = os.type();
    if (this.PLATFORM === 'Linux') this.PLATFORM += '_' + os.arch();
  }

  private downloadArduino(callback: (string, error) => void) {
    const dlDir = util.tmpdir('cb-ard-dl');
    const url: string = this.downloads.arduino[this.PLATFORM];

    util
      .download(url, dlDir)
      .then((file) => {
        callback(file, null);
      })
      .catch((err) => {
        callback(null, err);
      });
  }

  private downloadCli(callback: (string, error) => void) {
    const dlDir = util.tmpdir('cb-cli-dl');
	let arch = os.arch();
	if(arch == "ia32") arch = "x32";
    const plat = os.type() + (os.type() !== 'Darwin' ? "_" + arch : '');
    const url: string = this.downloads.arduino_cli[plat];

    util
      .download(url, dlDir)
      .then((file) => {
        callback(file, null);
      })
      .catch((err) => {
        callback(null, err);
      });
  }

  private installCliWindows(file, callback: (err) => void) {
    const tmp = util.tmpdir('cb-cli-inst');
    const dest = path.join(os.homedir(), 'AppData', 'Local', 'ArduinoCLI');
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

    util
      .extract(file, tmp)
      .then(() => {
        const _file = 'arduino-cli.exe';
        const install = path.join(dest, _file);

        fs.copySync(path.join(tmp, _file), install);

        this.cliInit(dest, (err) => {
            callback(err);
        });
      })
      .catch((err) => {
        callback(err);
      });
  }

  private installCliUnix(file, callback: (err) => void) {
    const tmp = util.tmpdir('cb-cli-inst');
    const dest = path.join(os.homedir(), '.arduino');
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

    util
      .extract(file, tmp)
      .then(() => {
        const file = 'arduino-cli';
        const install = path.join(dest, file);

        fs.copySync(path.join(tmp, file), install);

        fs.chmodSync(install, '755');

        this.cliInit(dest, (err) => {
            callback(err);
        });
      })
      .catch((err) => {
        callback(err);
      });
  }

  private cliInit(path, callback: (error) => void) {
      (async () => {
          await CLI.run(['config', 'init', '--overwrite'], path);
          await CLI.run(['core', 'update-index'], path);
          await CLI.run(['lib', 'update-index'], path);
          callback(null);
      })().then(() => callback(null)).catch(e => {
          logger.log("CLI init error", e);
          callback(e);
      });
  }

  private installCli(file, callback: (err) => void) {
    if (this.PLATFORM == 'Windows_NT') {
      this.installCliWindows(file, callback);
    } else if (this.PLATFORM.startsWith('Linux') || this.PLATFORM === "Darwin") {
      this.installCliUnix(file, callback);
    }
  }

  private installArduinoWindows(file, callback: (err) => void) {
    sudoPrompt.exec(
      file + ' /S',
      { name: 'Arduino installer', icns: "./resources/icon.icns" },
      (error, stderr, stdout) => {
        if (error) {
            var err;
            if(error instanceof Error){
                err = error as any;
                err.stdout = stdout;
                err.stderr = stderr;
                callback(error);
            }else{
                err = error;
            }
            callback(err);
            return;
        }

        callback(null);
      }
    );
  }

  private installArduinoLinux(file, callback: (err) => void) {
    const tmp = util.tmpdir('cb-ard-inst');
    const dest = path.join(os.homedir(), '.arduino');
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

    let installPath: string | undefined;

    util
      .extract(file, tmp)
      .then(() => {
        const files = fs.readdirSync(tmp);
        if (files.length == 0) {
          callback(new Error('Archive extract failed.'));
          return;
        }

        const name = files[0];
        installPath = path.join(dest, name);

        fs.copySync(path.join(tmp, name), installPath);

        fs.chmodSync(path.join(installPath, 'arduino'), '755');
        fs.chmodSync(path.join(installPath, 'arduino-builder'), '755');
        fs.chmodSync(path.join(installPath, 'tools-builder', 'ctags'), '755');
        fs.chmodSync(path.join(installPath, 'arduino-linux-setup.sh'), '755');
        fs.chmodSync(path.join(installPath, 'install.sh'), '755');

        const ctagsDir = path.join(installPath, 'tools-builder', 'ctags');
        let ctagsDirContent = fs.readdirSync(ctagsDir).filter(dirName => {
            return fs.statSync(path.join(ctagsDir, dirName)).isDirectory();
        });
        if(ctagsDirContent.length != 0){
            fs.chmodSync(path.join(ctagsDir, ctagsDirContent[0], "ctags"), "755");
        }

          const ppDir = path.join(installPath, 'tools-builder', 'arduino-preprocessor');
          let ppDirContent = fs.readdirSync(ppDir).filter(dirName => {
              return fs.statSync(path.join(ppDir, dirName)).isDirectory();
          });
          if(ppDirContent.length != 0){
              fs.chmodSync(path.join(ppDir, ppDirContent[0], "arduino-preprocessor"), "755");
          }

        const installerPath = path.join(installPath, 'install.sh');
        const setupPath = path.join(installPath, 'arduino-linux-setup.sh');

        const user = os.userInfo().username;
        const rules = util.tmpdir('cm-ard-rules');
        const setup: string[] = [
          `groupadd -f plugdev`,
          `groupadd -f dialout`,
          `usermod -a -G tty ${user}`,
          `usermod -a -G dialout ${user}`,
          `usermod -a -G uucp ${user}`,
          `usermod -a -G plugdev ${user}`,
          `usermod -a -G plugdev ${user}`,

          `mkdir -p ${rules}`,

          `echo 'KERNEL=="ttyUSB[0-9]*", TAG+="udev-acl", TAG+="uaccess", OWNER="${user}"' >> ${rules}/90-extraacl.rules`,
          `echo 'KERNEL=="ttyACM[0-9]*", TAG+="udev-acl", TAG+="uaccess", OWNER="${user}"' >> ${rules}/90-extraacl.rules`,

          `echo 'SUBSYSTEM=="tty", ENV{ID_REVISION}=="8087", ENV{ID_MODEL_ID}=="0ab6", MODE="0666", ENV{ID_MM_DEVICE_IGNORE}="1", ENV{ID_MM_CANDIDATE}="0"' >> ${rules}/99-arduino-101.rules`,
          `echo 'SUBSYSTEM=="usb", ATTR{idVendor}=="8087", ATTR{idProduct}=="0aba", MODE="0666", ENV{ID_MM_DEVICE_IGNORE}="1"' >> ${rules}/99-arduino-101.rules`,

          `mv ${rules}/*.rules /etc/udev/rules.d/`,

          `udevadm control --reload-rules`,
          `udevadm trigger`,

          `if [ -d /lib/systemd/ ]; then systemctl restart systemd-udevd; else service udev restart; fi`,

          `sh "${installerPath}"`
        ];

        sudoPrompt.exec(
          setup.join(' && '),
          { name: 'Arduino installer', icns: "./resources/icon.icns" },
          (error, stderr, stdout) => {
            console.log(stderr);
            console.log(stdout);
            if (error) {
                var err;
                if(error instanceof Error){
                    err = error as any;
                    err.stdout = stdout;
                    err.stderr = stderr;
                    callback(error);
                }else{
                    err = error;
                }

                if(installPath){
                    rimraf(installPath, {  }, () => {
                        callback(err);
                    });
                }
              return;
            }

            callback(null);
          }
        );
      })
      .catch((err) => {
        callback(err);
      });
  }

    private installArduinoDarwin(file, callback: (err) => void) {
        const tmp = util.tmpdir('cb-ard-inst');
        const dest = '/Applications';

        util.extract(file, tmp)
            .then(() => {
                const files = fs.readdirSync(tmp);
                if (files.length == 0) {
                    callback(new Error('Archive extract failed.'));
                    return;
                }

                const name = files[0];
                const arduinoPath = path.join(tmp, name);
                const installerPath = path.join(process.resourcesPath, "resources", "ArduinoInstallerRO.dmg");

                util.mountDmg(installerPath, (err, mountPath) => {
                    if(err){
                        callback(err);
                        return;
                    }

                    const dmgTmp = util.tmpdir("cb-ard-dmg");
                    const dmgTmpPath = path.join(dmgTmp, "ArduinoInstaller.dmg");
                    const dmgTmpContent = path.join(dmgTmp, "content");
                    fs.copySync(mountPath, dmgTmpContent);
                    fs.copySync(arduinoPath, path.join(dmgTmpContent, name));

                    console.log("Creating new dmg");

                    childProcess.execSync(["hdiutil",
                        "create",
                        "-volname 'Arduino Installer'",
                        "-srcfolder " + `'${dmgTmpContent}'`,
                        "-ov",
                        "-format UDZO",
                        dmgTmpPath
                    ].join(" "));

                    childProcess.execSync(["umount", `'${mountPath}'`].join(" "));
                    childProcess.exec(["open", dmgTmpPath].join(" "));

                });

                this.installDriverDarwin(callback);
            })
            .catch((err) => {
                callback(err);
            });

    }

    public installDriverDarwin(callback: (err) => void){
      const tmpDir = util.tmpdir("cb-ard-driver");
        const driverPath = path.join(process.resourcesPath, "resources", "Mac_OSX_VCP_Driver.zip");
        util.extract(driverPath, tmpDir)
            .then(() => {

                const extracted = path.join(tmpDir, "macOS_VCP_Driver", "SiLabsUSBDriverDisk.dmg");
                util.mountDmg(extracted, (err, mountPath) => {
                    const kextPath = path.join(mountPath, "Install CP210x VCP Driver.app", "Contents", "Resources", "SiLabsUSBDriver.kext");

                    const setup: string[] = [
                        `cp -r '${kextPath}' /Library/Extensions/`,
                        `chown -R root:wheel /Library/Extensions/SiLabsUSBDriver.kext`,
                        `chmod -R 755 /Library/Extensions/SiLabsUSBDriver.kext`,
                        `kextcache -i /`
                    ];

                    sudoPrompt.exec(setup.join(" && "), {
                            name: 'Arduino installer',
                            icns: path.join(process.resourcesPath, "resources", "icon.icns")
                        },
                        (error, stdout, stderr) => {
                            if(error){
                                var err;
                                if(error instanceof Error){
                                    err = error as any;
                                    err.stdout = stdout;
                                    err.stderr = stderr;
                                    callback(error);
                                }else{
                                    err = error;
                                }
                                callback(err);
                                return;
                            }

                            callback(null);
                        });
                });

            })
            .catch((err) => callback(err));
    }

  private installArduino(file, callback: (err) => void) {
    if (this.PLATFORM === 'Windows_NT') {
      this.installArduinoWindows(file, callback);
    } else if (this.PLATFORM.startsWith('Linux')) {
      this.installArduinoLinux(file, callback);
    } else if (this.PLATFORM === "Darwin") {
      this.installArduinoDarwin(file, callback);
    }
  }

  private installRingoLib(callback: (err) => void, info: InstallInfo, stage?: (string) => void){
      callback(null);
  }

  private installPlatforms(callback: (err) => void, info: InstallInfo, stage?: (string) => void) {
    const additionals = [
      this.downloads.ringo.manager,
      this.downloads.nibble.manager
    ].join(",");

    async function execCli(args: string[]){
      await CLI.run(args, info);
    }

    (async () => {
      await execCli(['--additional-urls', additionals, 'core', 'update-index']);
      await execCli(['--additional-urls', additionals, 'lib', 'update-index']);
      await execCli([
          '--additional-urls',
          additionals,
          'core',
          'install',
          this.downloads.ringo.fqbn
      ]);
      await execCli([
          '--additional-urls',
          additionals,
          'core',
          'install',
          this.downloads.nibble.fqbn
      ]);
    })().then(() => this.installRingoLib(callback, info, stage)).catch(e => callback("Library update error. Please check your internet connection."));
  }

  private arduino(callback: (err) => void) {
    this.downloadArduino((file, err) => {
      if (err) {
        callback(err);
        return;
      }

      this.installArduino(file, (error) => {
        callback(error);
      });
    });
  }

    private checkArduinoUpdate(callback: (err) => void, info: InstallInfo, stage?: (string) => void){
        callback(null);
        return;

        if(info.arduinoVersion == ""){
          callback(null);
          return;
        }

        if(isNewer(this.versions.arduino, info.arduinoVersion)){
            console.log("Required version", this.versions.arduino, "is newer than installed version", info.arduinoVersion);
            console.log("Updating Arduino");
            if(stage) stage("ARDUINO");
            this.arduino(callback);
        }else{
            callback(null);
        }
    }

  private cli(callback: (err) => void) {
    this.downloadCli((file, err) => {
      if (err) {
        callback(err);
        return;
      }

      this.installCli(file, (error) => {
        callback(error);
      });
    });
  }

  private checkCliUpdate(callback: (err) => void, info: InstallInfo, stage?: (string) => void){
      const cliPath = path.join(info.cli, "arduino-cli" + (this.PLATFORM == "Windows_NT" ? ".exe" : ""));

      CLI.run([ "--format", "json", "version" ], info).then(data => {
          const cliData = JSON.parse(data);

          if(isNewer(this.versions.cli, cliData.VersionString)){
              console.log("Updating CLI");
              if(stage) stage("CLI");
              fs.unlinkSync(cliPath);
              this.cli(callback);
          }else{
              callback(null);
          }
      }).catch(e => {
          logger.log("CLI version check error", e);
          callback(e);
      });
  }

  public install(info: InstallInfo | null, stage: (string) => void, error: (err) => void) {
    const stageRingo = (err) => {
        if (err) {
            error(err);
            return;
        }

      ArduinoCompiler.checkInstall();
      stage('DONE');
    };

    const stageCli = (err) => {
      if (err) {
        error(err);
        return;
      }

      stage('RINGO');
      this.installPlatforms(stageRingo, ArduinoCompiler.checkInstall());
    };

    const stageArduino = (err) => {
      if (err) {
        error(err);
        return;
      }

      if (info == null || info.cli == null) {
        stage('CLI');
        this.cli(stageCli);
      } else {
        stage('DONE');
      }
    };

    if (info == null || info.arduino == null) {
      stage('ARDUINO');
      this.arduino(stageArduino);
    } else if (info.cli == null) {
      stage('CLI');
      this.cli(stageCli);
    } else if (info.local == null || info.sketchbook == null) {
      stage('CLI');
      this.cliInit(info.cli, (err) => {
          if(err){
              error(err);
              return;
          }

          stage('RINGO');
          this.installPlatforms(stageRingo, ArduinoCompiler.checkInstall());
      });
    }
  }

  public update(stage: (string) => void, info: InstallInfo, error: (err) => void){
      const ringo = () => {
          this.installPlatforms((err) => {
              if(err){
                  error(err);
                  return;
              }

              ArduinoCompiler.checkInstall();
              stage('DONE');
          }, info, stage);
      };

      const cli = () => {
          this.checkCliUpdate((err) => {
              if(err){
                  error(err);
                  return;
              }

              stage("UPDATE");
              ringo();
          }, info, stage);
      };

      this.checkArduinoUpdate((err) => {
          if(err){
              error(err);
              return;
          }

          stage("UPDATE");
          cli();
      }, info, stage);
  }
}
