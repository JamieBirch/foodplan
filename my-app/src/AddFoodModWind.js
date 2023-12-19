
import React from "react";
import { Modal, Button } from 'react-bootstrap';
import "./UI.css";


const AddFoodModWind = ({
  showModal,
  handleCloseModal,
  modalValues,
  animationOut }) => {

  return (
    <Modal show={showModal} onHide={handleCloseModal} className={animationOut ? 'scale-out-center' : ''}>
      <Modal.Header closeButton>
        <Modal.Title>The food was added successfully</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Object.keys(modalValues).length !== 0 && (
          <>
            <h3>{modalValues.name}</h3>
            <p>Protein: {modalValues.protein}</p>
            <p>Fats: {modalValues.fat}</p>
            <p>Carbs: {modalValues.carbs}</p>
            <p>Ccal: {modalValues.ccal}</p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="secondary" onClick={handleCloseModal}>
            Закрыть
          </Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default AddFoodModWind;


