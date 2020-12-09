const updateOrdertoDB = async (inputData) => {
    const response = await fetch('http://localhost:3000/order-form/1', { //url needs to match in src/index
        method: 'PUT',
        body: JSON.stringify(inputData),
        headers: {
            'Content-Type' : 'application/json'
        }
    });

    const myJson = await response.json();
}
const updateSurveytoDB = async (inputData) => {
    const response = await fetch('http://localhost:3000/customer-survey/1', { //url needs to match in src/index
        method: 'PUT',
        body: JSON.stringify(inputData),
        headers: {
            'Content-Type' : 'application/json'
        }
    });

    const myJson = await response.json();
}