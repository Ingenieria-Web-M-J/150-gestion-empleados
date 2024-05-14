import { gql } from "apollo-server-micro";


// TODO: Obtener el nombre del user, no el userId

export const GET_EMPLOYEES = gql`
    query GetEmployees {
        employees {
        id
        name
        baseSalary
        createdAt
        email
        address
        phone
        createdBy {
            name
          }
        }
    }
`;

export const GET_EMPLOYEE = gql`
    query GetEmployee($id: String!) {
        employee(id: $id) {
        id
        name
        baseSalary
        createdAt
        userId
        }
    }
`;



