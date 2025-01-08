import PropTypes from 'prop-types'

const tips = [
  {
    title: "Act Quickly",
    description:
      "Start searching as soon as you realize the item is missing. The sooner you act, the higher the chances of recovering it.",
  },
  {
    title: "Retrace Your Steps",
    description:
      "Think about where you last had the item and backtrack your movements. Visit those places and ask around.",
  },
  {
    title: "Check Local Lost & Found",
    description:
      "Many public places like parks, malls, restaurants, and public transport services maintain a lost and found section. Contact them immediately.",
  },
  {
    title: "Use Online Platforms",
    description:
      "Post about your lost item on platforms like 'Track & Retrieve' and social media. Include a clear description and a photo.",
  },
  {
    title: "Spread the Word",
    description:
      "Inform friends, family, or colleagues about your lost item. They might spot it or spread the word to others.",
  },
  {
    title: "Offer a Reward",
    description:
      "A small reward can incentivize people to return your item. Make sure to be cautious and meet in public if someone claims to have it.",
  },
];

const resources = [
  {
    category: "Local Lost & Found Directories",
    description: "A list of lost & found offices in major public spaces, such as airports, shopping centers, and public transport hubs.",
  },
  {
    category: "Social Media Groups",
    description: "Links to community Facebook groups or local forums dedicated to lost and found items.",
  },
  {
    category: "Printable Posters",
    description: "Downloadable templates for lost or found item posters that users can customize and print.",
  },
  {
    category: "Useful Apps",
    description: "Apps or services that assist in tracking and finding items, such as GPS trackers.",
  },
  {
    category: "Contact Numbers",
    description: "Emergency or assistance contact numbers for lost items in public places (e.g., transit helplines, mall customer service).",
  },
];

const Tip = ({ title, description }) => (
  <div className="mb-4">
    <h4 className="text-lg font-semibold">{title}</h4>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

Tip.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const Resource = ({ category, description }) => (
  <div className="mb-4">
    <h4 className="text-lg font-semibold">{category}</h4>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

Resource.propTypes = {
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const TipsAndResources = () => {
  return (
    <div className="bg-base-200 p-8 mt-16">
      <h2 className="text-2xl font-bold mb-6">Tips & Resources</h2>

      {/* Tips Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Tips for Finding Lost Items</h3>
        {tips.map((tip, index) => (
          <Tip key={index} title={tip.title} description={tip.description} />
        ))}
      </div>

      {/* Resources Section */}
      <div>
        <h3 className="text-xl font-bold mb-4">Recommended Resources</h3>
        {resources.map((resource, index) => (
          <Resource
            key={index}
            category={resource.category}
            description={resource.description}
          />
        ))}
      </div>
    </div>
  );
};


export default TipsAndResources;
