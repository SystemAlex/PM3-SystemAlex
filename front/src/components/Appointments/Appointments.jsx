

const Appointments = ({ date, description, status, time }) => {
    return (
        <div>
            <h2>{date} {time}</h2>
            <p>{description}</p>
            <p>{status}</p>
        </div>
    );
};

export default Appointments;
