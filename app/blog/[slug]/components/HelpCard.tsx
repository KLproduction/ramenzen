import React from "react";

const HelpCard = () => {
  return (
    <div className="rounded-lg bg-yellow-50 p-4 text-yellow-900 shadow">
      <h3 className="mb-2 text-lg font-semibold">Need Help?</h3>
      <p className="mb-2 text-sm">
        If you have questions or need assistance, please contact our support
        team.
      </p>
      <a
        href="/contact"
        className="text-yellow-700 underline hover:text-yellow-900"
      >
        Contact Us
      </a>
    </div>
  );
};

export default HelpCard;
