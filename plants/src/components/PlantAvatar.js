import React from 'react';

import image7 from '../assets/7.png';
import image8 from '../assets/8.png';
import image9 from '../assets/9.png';
import image10 from '../assets/10.png';
import image11 from '../assets/11.png';
import image12 from '../assets/12.png';
import image13 from '../assets/13.png';
import image14 from '../assets/14.png';
import image15 from '../assets/15.png';
import image16 from '../assets/16.png';


class PlantAvatar extends React.Component {

    avatarPicker = (avatarId) => {
        switch(avatarId) {
            case 7:
                return image7;
            case 8:
                return image8;
            case 9:
                return image9;
            case 10:
                return image10;
            case 11:
                return image11;
            case 12:
                return image12;
            case 13:
                return image13;
            case 14:
                return image14;
            case 15:
                return image15;
            case 16:
                return image16;
        }
    };

    render(){
        return (
            <div>
                <img 
                src={this.avatarPicker(this.props.plantAvatarId)} 
                height={this.props.avatarHeight} 
                alt={this.props.plantAvatarId}/>
            </div>
        )
    }


}

export default PlantAvatar;