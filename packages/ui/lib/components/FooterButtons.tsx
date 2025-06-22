import type React from 'react';
import mixpanel from 'mixpanel-browser';

interface FooterButtonsProps {
  showPrivacyPolicy?: boolean;
}

const FooterButtons: React.FC<FooterButtonsProps> = ({ showPrivacyPolicy = true }) => {
  const handleStarClick = () => {
    mixpanel.track('star_clicked');
  };

  const handleFeedbackClick = () => {
    mixpanel.track('feedback_link_clicked');
  };

  const handlePrivacyClick = () => {
    mixpanel.track('privacy_policy_clicked');
  };

  return (
    <div className="flex items-center justify-between mt-4 px-3 pb-2">
      {/* Star icon */}
      <button
        type="button"
        className="flex items-center group cursor-pointer bg-transparent border-none p-0 focus:outline-none"
        onClick={handleStarClick}
        aria-label="Star">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="#cbd5e1"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 transition-colors duration-200 group-hover:fill-yellow-400">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      </button>
      {/* Buttons */}
      <div className="flex gap-2">
        <a
          href="https://forms.gle/49r2QQyzHWETugm18"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-100"
          onClick={handleFeedbackClick}>
          Send feedback
        </a>
        {showPrivacyPolicy && (
          <a
            href="https://qroar.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-100"
            onClick={handlePrivacyClick}>
            Privacy Policy
          </a>
        )}
      </div>
    </div>
  );
};

export default FooterButtons;
