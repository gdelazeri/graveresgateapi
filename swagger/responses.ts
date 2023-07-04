const responses = {
  ResponseLogin: {
    success: false,
    result: {
      accessToken: 'string',
      refreshToken: 'string',
    },
  },
  ResponseUser: {
    success: false,
    result: {
      _id: 'string',
      registrationId: 'string',
      name: 'string',
      email: 'string',
      password: 'string',
      permission: 'string',
      status: 'string',
      isDriver: true,
      imageUrl: 'string',
      createdAt: 'string',
      updatedAt: 'string',
      deletedAt: 'string',
    },
  },
  ResponseUserList: {
    success: false,
    result: [{
      _id: 'string',
      registrationId: 'string',
      name: 'string',
      email: 'string',
      password: 'string',
      permission: 'string',
      status: 'string',
      isDriver: true,
      imageUrl: 'string',
      createdAt: 'string',
      updatedAt: 'string',
      deletedAt: 'string',
    }],
  }
}

export default responses;
