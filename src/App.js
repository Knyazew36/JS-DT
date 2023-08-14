import React, { Component } from "react";
import { FetchUsers } from "./api/FetchUsers";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  async componentDidMount() {
    const users = await FetchUsers();
    this.setState({ users: users });
  }

  render() {
    const { users } = this.state;
    //Каждый второй
    const secondElements = users.filter((user, index) => {
      return index % 2 === 1;
    });
    // Присваиваем null
    const modifiedData = secondElements.map((user, index) => {
      if ((index + 1) % 3 === 0) {
        user.address.geo.lat = null;
        user.address.geo.lng = null;
      }
      return user;
    });

    // id
    const userIds = modifiedData.reduce((acc, user) => {
      return acc + ` ${user.id}`;
    }, "");

    return (
      <div>
        <h1>Список юзеров</h1>
        <div>ID выведенных юзеров:{userIds} </div>

        <ul>
          {modifiedData.map(({ id, name, username, email, address }) => (
            <li key={id}>
              {`${name}, ${username} ${email}`}{" "}
              <a
                href={email}
                onClick={(event) => {
                  event.preventDefault();
                  console.log(email);
                }}
              >
                ссылка email
              </a>{" "}
              <br />
              lat:{" "}
              {address.geo && address.geo.lat != null
                ? address.geo.lat
                : "не определено"}
              , lng:{" "}
              {address.geo && address.geo.lng != null
                ? address.geo.lng
                : "не определено"}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
