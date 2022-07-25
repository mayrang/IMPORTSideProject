import { Modal } from 'antd';
import React from 'react';
import PropTypes from "prop-types";

const ReservationModal = ({reservationVisible, cancelReservationModal}) => {
    return (
        <Modal visible={reservationVisible} onCancel={cancelReservationModal}>

        </Modal>
    );
};

ReservationModal.propTypes = {
    reservationVisible: PropTypes.bool.isRequired,
    cancelReservationModal: PropTypes.func.isRequired,
}

export default ReservationModal;

