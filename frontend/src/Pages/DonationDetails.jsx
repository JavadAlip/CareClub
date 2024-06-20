// // DonationDetails.jsx
// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import PaymentForm from '../Components/Payment/PaymentForm';

// const DonationDetails = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Check if location.state is null and redirect to the form page if so
//   if (!location.state) {
//     navigate('/donate');
//     return null;
//   }

//   const { formData } = location.state;

//   return (
//     <div className="container mx-auto pt-[140px]">
//       <h2 className="text-2xl mb-4">Donation Details</h2>
//       <div className="space-y-2">
//         <p><strong>Name:</strong> {formData.Name}</p>
//         <p><strong>Phone Number:</strong> {formData.PhoneNumber}</p>
//         <p><strong>Place:</strong> {formData.Place}</p>
//         <p><strong>Amount:</strong> ${formData.Amount}</p>
//       </div>
//       <div>
//       <PaymentForm amount={formData.Amount} />
//       </div>
//     </div>
//   );
// };

// export default DonationDetails;
// DonationDetails.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentForm from '../Components/Payment/PaymentForm';

const DonationDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if location.state is null and redirect to the form page if so
  if (!location.state) {
    navigate('/donate');
    return null;
  }

  const { formData } = location.state;

  return (
    <div className="container mx-auto pt-[140px]">
      <h2 className="text-2xl mb-4">Donation Details</h2>
      <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 space-y-2">
          <p><strong>Name:</strong> {formData.Name}</p>
          <p><strong>Phone Number:</strong> {formData.PhoneNumber}</p>
          <p><strong>Place:</strong> {formData.Place}</p>
          <p><strong>Amount:</strong> ${formData.Amount}</p>
        </div>
        <div className="flex-1 mt-2 md:mt-0"> {/* Added mt-2 for mobile screens */}
          <PaymentForm amount={formData.Amount} />
        </div>
      </div>
    </div>
  );
};

export default DonationDetails;
