import "../styles/Introduction.css";
import learning from "../assets/studying.png";
import teaching from "../assets/teaching.png";
import rewards from "../assets/reward.png";

const Introduction = () => {
  return (
    <div className="home-introduction">
      <h3>
        <span>Features</span>
      </h3>
      <div className="hi-container">
        <img src={learning} alt="learning"></img>
        <div className="hi-text">
          <p>
            Study from the comfort of your own home. Search and pick from a
            range of courses to acquire new skills or polish old ones. Complete
            and submit individually graded assignments to ensure high quality
            assessments.
          </p>
        </div>
      </div>
      <div className="hi-container">
        <img src={teaching} alt="teaching"></img>
        <div className="hi-text">
          <p>
            Get access to a wide audience & receive fair payment. Use your
            creative skills to make engaging & intuitive academic content.
          </p>
        </div>
      </div>
      <div className="hi-container">
        <img src={rewards} alt="rewards"></img>
        <div className="hi-text">
          <p>
            Receive rewards in the form of cryptotokens (EDBX). Convert to fiat
            currency or use it to purchase more courses as per your desire. Get
            offers from recruiters based on your performance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
