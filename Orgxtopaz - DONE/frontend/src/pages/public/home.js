import PublicFooter from "../../component/public-page-footer";
import PublicHeader from "../../component/public-page-header";

export default function Home() {
  return (
    <div >
      <PublicHeader></PublicHeader>

      <div className="info-row-container">
        <div className="row-inner-element">
          <div className="col-1">
            <h2>InfinityTracker™</h2>
            <h3>
              Track your data to see how
              <br />
              you are doing each day
            </h3>
            <p>(Mobile compatible)</p>
            <button
              className="info-sign-up-btn"
              onClick={() => (window.location.href = "./internal-access")}
              type="button"
            >
              SIGN UP NOW
              <img src={require("../../media/icons/icons8-arrow-100.png")} />
            </button>
          </div>
          <div className="col-2">
            <img
              className="subs-icon"
              src={require("../../media/image/1755_U1RVRElPIEtBVCA0MTYtODg.jpg")}
              alt="couples running"
            />
          </div>
        </div>
      </div>

      <div className="other-storie_wrapper">
        <div className="other-storie_card">
          <div className="other-storie_content">
            <h2 className="other-storie_title">Customized your activity</h2>
            <p className="other-storie_paragraph">
              <b>InfinityTracker™</b> enable you to create your own activity via
              our simple form or chooseing from activities that you have already
              done in the past. In the near future, we will enhance your
              experience by having an option to track more data. We currently
              offer duration and date.
            </p>
          </div>
        </div>
        <div className="other-storie_card">
          <div className="other-storie_content">
            <h2 className="other-storie_title">View/Edit your dashboard</h2>
            <p className="other-storie_paragraph">
              In the next release, we will let you customized your own
              dashboard. For now <b>InfinityTracker™</b> will let you view your
              saved activities along with data. So you know how to plan for your
              exercise and get fit before summer!
            </p>
          </div>
        </div>
        <div className="other-storie_card">
          <div className="other-storie_content">
            <h2 className="other-storie_title">Manage your profile</h2>
            <p className="other-storie_paragraph">
              At <b>InfinityTracker™</b> we love to customize. When you sign up
              for an account, you will have an ability to manage your profile
              eg. changing your always forgotten password! We will surely update
              more functionality in the near future.
            </p>
          </div>
        </div>
      </div>

      <div className="daily-info_wrapper">
        <p className="daily-info_paragraph">
          STAY INFORMED.
          <br />
          GET AN UPDATE ON OUR LATEST FEATURES.
        </p>
        <form className="daily-info_form">
          <input className="daily-info_email-input" placeholder="E-mail" />
          <button className="daily-info_submit" type="button">
            SUBSCRIBE
          </button>
        </form>
      </div>

      <PublicFooter></PublicFooter>
    </div>
  );
}
