import 'isomorphic-fetch'
import Head from 'next/head'

class Shot extends React.Component {
  render() {
    return <div className="shot">
      <img src={ this.props.shot.images.hidpi } />
      <h3>{ this.props.shot.title }</h3>

      <style jsx>{`
        .shot {
          box-shadow: 0 3px 4px rgba(0,0,0,0.2);
          margin: 1em;
        }
        img {
          width: 100%;
        }
        h3 {
          margin: 0;
          padding: 1em;
          font-weight: 300;
          color: #333;
        }
      `}</style>
    </div>
  }
}


export default class extends React.Component {

  static async getInitialProps() {
    const req = await fetch('https://kiteapi.herokuapp.com/dribbble/shots/1')
    const dribbble = await req.json()

    return { shots: dribbble.shots }
  }

  render() {

    return <div>
      <Head>
        <title>Dribbble 💖</title>
        <meta name="viewport" content="width=device-width"/>
      </Head>

      <h1>Dribbble 💖</h1>

      <div className="shots">
        { this.props.shots.map( (shot) => (
          <Shot shot={shot} />
        ) ) }
      </div>

      <style jsx>{`
        :global(body) {
          background: #f7f7f7;
          margin: 0;
          font-family: system-ui;
        }
        h1 {
          color: #333;
          font-weight: 200;
          font-size: 2.5em;
          text-align: center;
        }
        .shots {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        }
      `}</style>
    </div>
  }
}