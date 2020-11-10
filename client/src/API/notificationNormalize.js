const notificationNormalize = (val) => {
  if (val.response.data.errors) {
    return val.response.data.errors.map((item) => ({
      status: val.response.data.status,
      message: item.msg,
      id: new Date().getTime() + Math.random(),
    }));
  } else {
    return {
      status: val.response.data.status,
      message: val.response.data.message,
      id: new Date().getTime() + Math.random(),
    };
  }
};

export default notificationNormalize;
