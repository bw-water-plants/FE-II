import React from 'react';
import UserProfile from './UserProfile';
import PlantsList from './PlantsList';



class Home extends React.Component {
    
    render(){
        return (
            <div>
                <PlantsList />                
            </div>
        )
    }
}

export default Home;