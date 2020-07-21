import React, { Component } from 'react'
import DogAdoption from '../../DogAdoption.jpg'
import './PetCare.css'
class PetCareInfo extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    render() {
        
        return (
            <div className = "pet-care-individual">
                <h5>{this.props.title}</h5>
                <hr></hr>
                <div className = "pet-care-individual-image">
                    <img src = {this.props.image} style = {{height:'100%', width:'100%'}}></img>
                </div>
                <div className = "pet-care-individual-description">
                    
                    <div className = "pet-care-individual-description-header">
                        <h6>Pet Adoption Tips   </h6>
                    </div>
                    <hr className = "remove-margin"></hr>
                    <div className = "pet-care-individual-description-body">
                        <p>
                            {this.props.description}
                            <a href="#">know more</a>
                        </p>
                        

                    </div>
                </div>
            </div>
        )
    }
}

export default PetCareInfo
