export const deCodeRequest = async (request = {}) => {
  try {
    return await request.json();
  } catch (error) {
    return {};
  }
};

export const response = (response = {}, status = 200) => {
  
  return new Response(JSON.stringify(response, { status }));
};
