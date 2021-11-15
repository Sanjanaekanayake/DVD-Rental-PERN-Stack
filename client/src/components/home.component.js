import background from "../images/img_01.jpg";
const Home = () => {

    const divStyle = {
        // width: '100%',
        // height: '800px',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // width: '100%',
        height: '100vh'  
      };

    return (
        <div style= {divStyle}>
            Hello World
        </div>
      );
}
export default Home