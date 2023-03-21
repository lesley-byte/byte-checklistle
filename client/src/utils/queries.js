import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
    query users {
        users {
            _id
            username
            email
            password
            checklists {
                _id
                title
            }
        }
    }
`;

export const QUERY_CHECKLISTS = gql`
    query checklists {
        checklists {
            _id
            title
        }
    }
`;

export const QUERY_CONDITIONS = gql`
    query conditions {
        conditions {
            _id
            title
            value
        }
    }
`;


