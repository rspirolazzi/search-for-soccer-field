import {Record, List} from 'immutable';

export const StadiumsState = Record({
    all: new List(),
    nearby: new List(),
    visited: new List(),
});

export const Stadium = Record({
    __v: 0,
    _id: null,
    address: null,
    code: null,
    createdAt: new Date(),
    domain: null,
    images: [],
    items: [],
    location: {},
    name: null,
    phone: null,
    services: [],
    state: [],
    updatedAt: new Date(),
    url: null,
});

export const User = Record({
    id: null,
    authToken: null,
    name: null,
    isGuest: null,
});
