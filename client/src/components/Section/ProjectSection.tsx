import React from 'react';

import { Card, CardContainer } from '../Card';
import Section from './Section';
import {Devices, Sketch} from '../../layouts/Home';
import {Button} from "semantic-ui-react";
import path from "path";

interface ProjectSectionProps {
  title: string;
  projects: { block: Sketch[], code: Sketch[] };
  onPress: (type: 'NEW' | 'OPEN', sketch?: Sketch) => void;
  createNew?: boolean;
  deleteSketches: (name: string, path: string) => void;
}

const ProjectSection: React.FC<ProjectSectionProps> = (props: ProjectSectionProps) => {
  const { title, projects, onPress, createNew } = props;


    return (
    <Section>
      <h2>{title}</h2>
      <CardContainer>
        {createNew && (
          <Card onClick={() => onPress('NEW' )} className={"new"}>
              <div>
                  <i className="material-icons"> add </i>
                  <h3>New project</h3>
              </div>
          </Card>
        )}

        {projects.block.map((sketch: Sketch, index) => (
          <Card key={`section-${title}-${index}`} className={ "descriptive " + (Devices.hasOwnProperty(sketch.device) ? Devices[sketch.device].name.toLowerCase() : undefined) }>
              <div className="image"><svg dangerouslySetInnerHTML={{ __html: sketch.snapshot || "" }} /></div>
            <div className="cover">
              <div className="title">{sketch.title}</div>
              <div className="description">
                  <p className="device">{Devices[sketch.device].name}</p>
                  { sketch.description && <p>{sketch.description}</p> }
              </div>
                <div>
                    <Button primary onClick={() => onPress('OPEN', sketch)}>Edit</Button>
                    <Button negative onClick={() => {
                        props.deleteSketches(sketch.title, sketch.path as string);
                    }}>Delete</Button>
                </div>
            </div>
          </Card>
        ))}

          {projects.code.map((sketch: Sketch, index) => <Card key={`section-${title}-${index}`} className={ "descriptive " + (Devices.hasOwnProperty(sketch.device) ? Devices[sketch.device].name.toLowerCase() : undefined) }>
              <div className="image code"><i className="material-icons"> code </i></div>
              <div className="cover">
                  <div className="title">{sketch.title}</div>
                  <div className="description">
                      <p className="device">{Devices[sketch.device].name}</p>
                      { sketch.description && <p>{sketch.description}</p> }
                  </div>
                  <Button primary onClick={() => onPress('OPEN', sketch)}>Edit</Button>
                  <Button negative onClick={() => props.deleteSketches(sketch.title, sketch.path as string)}>Delete</Button>

              </div>
          </Card>)}
      </CardContainer>
    </Section>
  );
};

export { ProjectSection };
