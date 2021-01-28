import React, { Component } from "react";
import ReactDOM from "react-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import {MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon, MDBBadge, MDBContainer, MDBRow, MDBCol} from "mdbreact";
import WeatherFetch from "./weatherFetch";
import "./index.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal:false,
      events: [
        { id: 1,
          time: "10:00", 
          title: "RDV Dentiste", 
          location: "4 Rue de la Cheville, Besançon", 
          description: ""
        },

        { id: 2,
          time: "10:30", 
          title: "Réunion quotidienne (récurrente)",
          location: "Bureau", 
          description: "Brief de la semaine"
        },

        { id: 3,
          time: "11:00", 
          title: "Appeler les Ressources Humaines",
        },

        {
          id: 4, 
          time: "12:00",
          title: "Déjeuner avec Timothé",
          location: "Kaf des vieux amants",
          description: "Sujet: prochains projets d'investissement"
        }
      ]
    };
  }

  // crée et retourne un nouveau tableau contenant tous les éléments du tableau d'origine qui sont différents de l'id. Exclue donc l'évènement en question.
  handleDelete = eventId => {
    const events = this.state.events.filter( e => e.id !== eventId);
    this.setState( {events});
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleInputChange = inputName => value => {
    const nextValue = value;
    this.setState({
      [inputName]: nextValue
    });
  };

  addEvent = () => {
    // on fait une copie du tableau
    var newArray = [...this.state.events];
    // La méthode push() ajoute un ou plusieurs éléments à la fin d'un tableau et retourne la nouvelle taille du tableau.
    newArray.push({
      id: newArray.length ? newArray[newArray.length - 1].id + 1 : 1,
      time: this.state.time,
      title: this.state.title,
      location: this.state.location,
      description: this.state.description,
      value: this.var > 5 ? "Its's grater then 5" : "Its lower or equal 5"
    });
    this.setState({ events: newArray });
    this.setState({
      time: "",
      title: "",
      location: "",
      description: ""
    });
  };
  
  render() {
    return (
      <React.Fragment>
      <MDBContainer className="text-white">
        <MDBRow>
          <MDBCol className="d-flex align-items-center justify-content-center" xs="6" md="8">
              <h1 className="my-3">
                Vous avez <span className="eventsnb">{" "}
                <b>{this.state.events.length} tâches</b></span> à réaliser.
              </h1>
          </MDBCol>
          <MDBCol md="4" className="text-center mb-3 mb-sm-3 d-none d-md-block">
            <WeatherFetch />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol size="12">
              <h2 className="text-uppercase my-3 font-weight-bold">Aujourd'hui:</h2>
              <div id="schedule-items">
                {this.state.events.map(event => (
                  <Event
                    key={event.id}
                    id={event.id}
                    time={event.time}
                    title={event.title}
                    location={event.location}
                    description={event.description} 
                    onDelete={this.handleDelete}
                  />
                ))}
              </div>
          </MDBCol>
          <MDBCol size="12">
            <MDBCol xl="3" md="6" className="mx-auto text-center">
              <MDBBtn 
                color="info" 
                rounded 
                onClick={this.toggleModal}
                className="mb-3">
                  Ajouter une tâche
              </MDBBtn>
            </MDBCol>
          </MDBCol>
        </MDBRow>

        <MDBModal isOpen={this.state.modal} toggle={this.toggleModal}>
          <MDBModalHeader
            className="text-center text-black"
            titleClass="w-100 font-weight-bold"
            toggle={this.toggleModal}
          >
            Ajouter une tâche
          </MDBModalHeader>
          <MDBModalBody>
            <form className="mx-3 grey-text">
              <MDBInput
                name="time"
                label="Heure"
                icon="clock"
                hint="12:30"
                group
                type="time"
                getValue={this.handleInputChange("time")}
              />
              <MDBInput
                name="title"
                label="Titre"
                icon="edit"
                hint="Titre"
                group
                type="text"
                getValue={this.handleInputChange("title")}
              />
              <MDBInput
                name="location"
                label="Emplacement (optionel)"
                icon="map"
                group
                type="text"
                getValue={this.handleInputChange("location")}
              />
              <MDBInput
                name="description"
                label="Description (optionel)"
                icon="sticky-note"
                group
                type="textarea"
                getValue={this.handleInputChange("description")}
              />
            </form>
          </MDBModalBody>
          <MDBModalFooter className="justify-content-center">
            <MDBBtn
              color="info"
              onClick={() => {
                this.toggleModal();
                this.addEvent();
              }}
            >
              Add
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
      </React.Fragment>
    );
  }
}

class Event extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="media mt-1">

          <h3 className="h3-responsive font-weight-bold mr-3">{this.props.time}</h3>

          <div className="media-body mb-3 mb-lg-3">
            <MDBBadge color="info" className="ml-2 float-right" onClick={ () => this.props.onDelete(this.props.id)}>
              -
            </MDBBadge>
            <h6 className="mt-0 font-weight-bold">{this.props.title} </h6>{" "}
            <hr className="hr-bold my-2" />
            {this.props.location && (
              <React.Fragment>
                <p className="font-smaller mb-0">
                  <MDBIcon icon="location-arrow" /> {this.props.location}
                </p>
              </React.Fragment>
            )}
          </div>

        </div>

        {this.props.description && (
          <p className="py-2 px-4 mb-4 rounded-pill description-bg">
            {this.props.description}
            </p>
          )}
      </React.Fragment>
    );
  }
}

 
ReactDOM.render(<App />, document.getElementById("root"));
