import React from 'react';

const Row = (props) => {



    return (
        <tr>
          <th>#</th>
          <th>
            Name
          </th>
          <th>
            Short Name
          </th>
          <th>
            $ Value
          </th>
          <th>
            last 24h
          </th>
          <th>
            Amount you own
          </th>
          <th>
            $ value of your coin
          </th>
          <th>$ your gain/loss since last change </th>
        </tr>
    );
};


export default Row;
