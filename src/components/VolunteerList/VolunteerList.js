import React from "react";
import { Table } from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import { processDate2 } from "../../utilities/utilities";

const VolunteerList = ({ userEvents, handleDelete }) => {
  return (
    <div>
      <h4>Volunteer register list</h4>
      <div className="p-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th> Name</th>
              <th>Email ID</th>
              <th>Register data</th>
              <th>Event Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userEvents.map((event) => (
              <tr key={`${event.userId}${event.eventId}`}>
                <td>{event.name}</td>
                <td>{event.username}</td>
                <td>{processDate2(event.registerDate)}</td>
                <td>{event.event}</td>
                <td>
                  <RiDeleteBin6Line
                    onClick={() => handleDelete(event.eventId, event.userId)}
                    className="admin-delete-btn"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default VolunteerList;
