import React from 'react';
import UserProfile from './UserProfile';
import PlantsList from './PlantsList';
// import Plant from './OLDPlant';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    
    render(){
        return (
            <div>
                <UserProfile />
                <PlantsList />
                <Link to="/plant"><button>Plant</button></Link>
            </div>
        )
    }
}

export default Home;