import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import Tool from '../src/app/models/Tool';

factory.define('User', User, {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
});

factory.define('UserErrorValidation', User, {
    name_error: faker.name.findName(),
    email_error: faker.internet.email(),
    password_error: faker.internet.password(),
});

factory.define('Session', User, {
    email: faker.internet.email(),
    password: faker.internet.password(),
});

factory.define('SessionErrorValidation', User, {
    email_error: faker.internet.email(),
    password_error: faker.internet.password(),
});

factory.define('Tool', Tool, {
    title: faker.name.title(),
    link: faker.internet.url(),
    description: faker.lorem.text(),
    tags: 'react, react native, api, node',
});

export default factory;
