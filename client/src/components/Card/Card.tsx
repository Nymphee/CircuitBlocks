import styled from 'styled-components';

const Card = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  height: 200px;
  background: #1045ba;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  color: white;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.2s ease;
  
  &.nibble {
    background: #FFC629;
  }
  
  &.spencer {
    background: #E3384D;
  }
  
  &.jay-d {
    background: #191919;
  }
  
  &.wheelson {
    background: #00BED6;
  }
  
  &.byteboi {
    background: #F1592A;
  }
  
  &.new {
    background: #fff;
    color: #595959;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    
    i { font-size: 60px; }
    
    h3 {
      font-weight: 300;
      font-size: 20px;
      margin-top: 10px;
    }
  }

  :hover {
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.6);
  }

  * {
    transition-duration: 0.3s;
  }

  .image {
    width: calc(100% - 16px);
    height: calc(100% - 56px);
    background: #ffffff;
    background-image: url('resources/images/profile.png');
    background-size: contain;
    position: relative;
    top: 8px;
    left: 8px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    opacity: 1;
    
    svg {
      background: #fff;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    
    &.code {
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        
        i {
            color: #595959;
            font-size: 120px;
        }
    }
  }
  
  &.descriptive:hover .image {
    top: -152px;
    opacity: 0;
  }

  .cover {
    position: absolute;
    padding: 4px 8px;
    width: calc(100% - 16px);
    height: 32px;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    top: calc(100% - 40px);
    left: 8px;
    text-align: center;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  &.descriptive:hover .cover {
    top: 0;
    left: 0;
    padding: 12px 16px;
    width: 100%;
    height: 100%;
  }

  .cover .title {
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 1px;
  }

  .cover .description {
    opacity: 0;
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    max-height: 0;
    transition: max-height 0.3s ease, opacity 0.3s ease;
    
    .device {
      font-weight: bold;
    }
  }
  &.descriptive:hover .cover .description {
    opacity: 1;
    max-height: 150px;
  }
`;

export default Card;
