import React from 'react';
import UserProfile from './UserProfile';
import PlantsList from './PlantsList';



class Home extends React.Component {
    
    render(){
        return (
            <div>
                <UserProfile/>
                <PlantsList />                
            </div>
        )
    }
}

export default Home;