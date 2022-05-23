const apiKey = '123456789';
// const endPoint = 'http://35.244.8.93:3001';
const endPoint = 'https://educmsapi.mycareerlift.com';
const endPoint1 = "https://edu_pay_backend.mycareerlift.com";
//1. WebHash
export const fetchWebHash = async (domain) => {
  const response = await fetch(endPoint + '/web_hash', {
    method: 'POST',
    body: new URLSearchParams({
      domain_name: domain,
      key: apiKey,
    }),
  });
  return response.json();
};
//2. Slider
export const fetchSlider = async (instId) => {
  const response = await fetch(endPoint + '/Get_Slider', {
    method: 'POST',
    body: new URLSearchParams({
      id: instId,
      key: apiKey,
    }),
  });
  return response.json();
};

// qr
export const fetchQrcode = async (instId) => {
  const response = await fetch(endPoint + '/qrcode', {
    method: 'POST',
    body: new URLSearchParams({
      id: instId,
      key: apiKey,
    }),
  });
  return response.json();
};




//3. Images
export const fetchImages = async (instId, limit) => {
  const response = await fetch(endPoint + '/Get_image1', {
    method: 'POST',
    body: new URLSearchParams({
      id: instId,
      limit: limit,
      key: apiKey,
    }),
  });
  return response.json();
};
//4. Institute Details
export const fetchInstituteDetails = async (instId) => {
  const response = await fetch(endPoint + '/Get_institute_details', {
    method: 'POST',
    body: new URLSearchParams({
      id: instId,
      key: apiKey,
    }),
  });
  return response.json();
};
//5. Contact us
export const fetchContactUs = async (
  instId,
  first_name,
  last_name,
  email,
  contact_no,
  your_query
) => {
  const response = await fetch(endPoint + '/Get_testimonial1', {
    method: 'POST',
    body: new URLSearchParams({
      id: instId,
      key: apiKey,
      first_name: first_name,
      last_name: last_name,
      email: email,
      contact_no: contact_no,
      your_query: your_query,
    }),
  });
  return response.json();
};
// Course Details
export const fetchCourseDetails = async (instId) => {
  const response = await fetch(endPoint + '/Get_course_detail', {
    method: 'POST',
    body: new URLSearchParams({
      id: instId,
      key: apiKey,
    }),
  });
  return response.json();
};
// Course Details By ID
export const fetchCourseDetailsById = async (instId, slug) => {
  const response = await fetch(
    endPoint + '/Get_course_detail/course_detail_by_id',
    {
      method: 'POST',
      body: new URLSearchParams({
        id: instId,
        key: apiKey,
        slug: slug,
      }),
    }
  );
  return response.json();
};
//Pacakage Details
export const fetchPackageDetails = async (instId, limit) => {
  const response = await fetch(endPoint + '/Get_package_detail', {
    method: 'POST',
    body: new URLSearchParams({
      id: instId,
      key: apiKey,
      limit: limit,
    }),
  });
  return response.json();
};
// Alerts
export const fetchAlerts = async (instId, limit) => {
  const response = await fetch(endPoint + '/get_alert1', {
    method: 'POST',
    body: new URLSearchParams({
      id: instId,
      key: apiKey,
      limit: limit,
    }),
  });
  return response.json();
};
// Core Features
export const fetchCoreFeatures = async (instId) => {
  const response = await fetch(endPoint + '/get_core_features', {
    method: 'POST',
    body: new URLSearchParams({
      id: instId,
      key: apiKey,
    }),
  });
  return response.json();
};
// Top Course
export const fetchTopCourses = async (instId, limit) => {
  const response = await fetch(endPoint + '/get_course_detail/top_courses', {
    method: 'POST',
    body: new URLSearchParams({
      id: instId,
      key: apiKey,
      limit: limit,
    }),
  });
  return response.json();
};
// Notification
export const fetchNotification = async (instId) => {
  const response = await fetch(endPoint + '/Get_notification1', {
    method: 'POST',
    body: new URLSearchParams({
      id: instId,
      key: apiKey,
    }),
  });
  return response.json();
};
// Testimonials
export const fetchTestimonials = async (instId) => {
  const response = await fetch(endPoint + '/Get_testimonial1', {
    method: 'POST',
    body: new URLSearchParams({
      id: instId,
      key: apiKey,
    }),
  });
  return response.json();
};
// Videos
export const fetchVideo = async (instId, limit) => {
  const response = await fetch(endPoint + '/Get_Video1', {
    method: 'POST',
    body: new URLSearchParams({
      id: instId,
      key: apiKey,
      limit: limit,
    }),
  });
  return response.json();
};
// PDF
export const fetchPdf = async (instId, limit) => {
  const response = await fetch(endPoint + '/Get_pdf_new1', {
    method: 'POST',
    body: new URLSearchParams({
      id: instId,
      key: apiKey,
      limit: limit,
    }),
  });
  return response.json();
};
// Blogs
export const fetchBlogs = async (instId) => {
  const response = await fetch(endPoint + '/Get_blogs', {
    method: 'POST',
    body: new URLSearchParams({
      id: instId,
      key: apiKey,
    }),
  });
  return response.json();
};
// Batch
export const fetchBatch = async (instId) => {
  const response = await fetch(endPoint + '/get_batch_details', {
    method: 'POST',
    body: new URLSearchParams({
      id: instId,
      key: apiKey,
    }),
  });
  return response.json();
};
// Faculty
export const fetchFaculty = async (instId, limit) => {
  const response = await fetch(endPoint + '/Get_faculty', {
    method: 'POST',
    body: new URLSearchParams({
      id: instId,
      key: apiKey,
      limit: limit,
    }),
  });
  return response.json();
};
// Basic Questions
export const fetchBasicQuestion = async (instId) => {
  const response = await fetch(endPoint + '/quick_test', {
    method: 'POST',
    body: new URLSearchParams({
      id: instId,
      key: apiKey,
    }),
  });
  return response.json();
};
// Dynamic Button
export const fetchDynamicButton = async (instId) => {
  const response = await fetch(endPoint + '/Get_dynamic_button', {
    method: 'POST',
    body: new URLSearchParams({
      id: instId,
      key: apiKey,
    }),
  });
  return response.json();
};
// Web Data
export const fetchWebData = async (instId) => {
  var url =
    'https://d2hp90zy5ktxok.cloudfront.net/website/' + instId + '.json';
  const response = await fetch(url);
  return response.json();
};
// Faq
export const fetchFaq = async (instId) => {
  const response = await fetch(endPoint + '/Get_Faq/', {
    method: 'POST',
    body: new URLSearchParams({
      id: instId,
      key: apiKey,
    }),
  });
  return response.json();
};
// Achievement
export const fetchAchievement = async (instId) => {
  const response = await fetch(endPoint + '/Get_students_achievements/', {
    method: 'POST',
    body: new URLSearchParams({
      id: instId,
      key: apiKey,
    }),
  });
  return response.json();
};
// Payment
export const fetchPayment = async (instId) => {
  const response = await fetch(endPoint + '/get_payment_details/', {
    method: 'POST',
    body: new URLSearchParams({
      id: instId,
      key: apiKey,
    }),
  });
  return response.json();
};
// Status
export const fetchStatus = async (instId) => {
  const response = await fetch(
    'https://d2hp90zy5ktxok.cloudfront.net/website/' + instId + '.json'
  );
  return response.json();
};
// Career Form
export const sendCareerData = async (data) => {
  data.append('key', apiKey);
  const response = await fetch(endPoint + '/careerform', {
    method: 'POST',
    body: data,
  });
  return response.json();
};
//Enquiry
export const sendEnquiryData = async (data) => {
  data.append('key', apiKey);
  const response = await fetch(endPoint + '/enquiry', {
    method: 'POST',
    body: data,
  });
  return response.json();
};
// Admission Form
export const sendAdmissionData = async (data) => {
  data.append('key', apiKey);
  const response = await fetch(endPoint + '/AdmissionForm', {
    method: 'POST',
    body: data,
  });
  return response.json();
};
// Contact Data
export const sendContactData = async (instId, data) => {
  data['key'] = apiKey;
  data['id'] = instId;
  const response = await fetch(endPoint + '/contact_us_new', {
    method: 'POST',
    body: new URLSearchParams(data),
  });
  return response.json();
};
// Franchise Form
export const sendFranchiseData = async (data) => {
  data['key'] = apiKey;
  // data['id']=instId;
  const response = await fetch(endPoint + '/contact_franchise', {
    method: 'POST',
    body: new URLSearchParams(data),
  });
  return response.json();
};
// Image Pop Up
export const fetchImagePopUp = async (instId) => {
  const response = await fetch(endPoint + '/Get_image_popup/', {
    method: 'POST',
    body: new URLSearchParams({
      id: instId,
      key: apiKey,
    }),
  });
  return response.json();
};

export const fetchOrderID = async (amount, keyId, secret) => {
  const response = await fetch('https://edu_pay_backend.mycareerlift.com/razorpay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount,
      keyId,
      secret,
    }),
  });
  return response.json();
};
export const fetchVerification = async (
  paymentId,
  orderId,
  signature,
  amount,
  secret
) => {
  const response = await fetch('https://edu_pay_backend.mycareerlift.com/verification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      orderId,
      paymentId,
      signature,
      amount,
      secret,
    }),
  });
  return response.json();
};
