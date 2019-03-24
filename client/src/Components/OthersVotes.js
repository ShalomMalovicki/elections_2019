import React from 'react';
import { Query } from 'react-apollo';
import { GET_All_USERS_GUESSES } from '../queries';
import { Bar } from 'react-chartjs-2';
import { Container } from 'reactstrap';

const OthersVotes = () => (
  <Query query={GET_All_USERS_GUESSES}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return `Error!: ${error}`;
      return (
        <Container>
          {data.getUsersGuesses.map(({ username, userGuesses }) => {
            const color = '255,99,132';
            return (
              <div key={`user-${username}`}>
                <h2>{username}</h2>
                <Bar
                  data={{
                    labels: userGuesses.map(({ name }) => name),
                    datasets: [
                      {
                        data: userGuesses.map(({ value }) => value),
                        backgroundColor: `rgba(${color},0.2)`,
                        borderColor: `rgba(${color},1)`,
                        borderWidth: 1,
                        hoverBackgroundColor: `rgba(${color},0.4)`,
                        hoverBorderColor: `rgba(${color},1)`
                      }
                    ]
                  }}
                  width={100}
                  height={100}
                  options={{
                    maintainAspectRatio: false,
                    legend: {
                      display: false
                    }
                  }}
                />
              </div>
            );
          })}
        </Container>
      );
    }}
  </Query>
);

export default OthersVotes;
