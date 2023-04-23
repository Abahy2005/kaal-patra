import React from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <div
        className="cursor-pointer py-4 px-6 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-gray-700">{question}</h3>
        <span className={`text-xl font-semibold transform ${isOpen ? 'rotate-180' : ''}`}>&#x25BC;</span>
      </div>
      {isOpen && (
        <div className="py-4 px-6">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

const How = () => {
  const faqData = [
    {
      question: 'What is the Decentralized Time Capsule Project?',
      answer:
        'The Decentralized Time Capsule Project is a platform that allows users to securely store and share memories, messages, and other digital content. It is censorship-resistant, private, and highly secure, making use of decentralized storage solutions.',
    },
    {
      question: 'How does the decentralized storage work?',
      answer:
        'Decentralized storage solutions like IPFS, Filecoin, or Arweave divide your data into smaller pieces, which are then distributed across a network of nodes. This ensures that the data is not controlled by a central authority and provides better security, privacy, and censorship resistance.',
    },
    {
      question: 'Is my data secure on the platform?',
      answer:
        'Yes, the platform uses cryptographic techniques to ensure that only you and the people you choose can access the content. Additionally, the decentralized storage network provides better security against data breaches.',
    },
    {
      question: 'How do I get started?',
      answer:
        'To get started, simply create an account, and you can begin adding your memories, messages, or other digital content to the platform. The platform will guide you through the process of storing and sharing your content.',
    },
    {
      question: 'What types of content can I store in the Decentralized Time Capsule?',
      answer:
        'You can store a variety of content types, including text, images, audio files, and video files. The platform is designed to accommodate various formats and sizes, allowing you to preserve a diverse range of memories and messages.',
    },
    {
      question: 'Can I share my content with others?',
      answer:
        'Yes, the Decentralized Time Capsule Project allows you to share your content with specific individuals or groups using secure sharing methods. You can also choose to make your content public, allowing anyone to access it.',
    },
    {
      question: 'How can I ensure my data remains accessible in the long term?',
      answer:
        'The decentralized nature of the platform ensures that your content is not dependent on a single central authority or server. By distributing your data across a network of nodes, the platform is more resilient to disruptions, providing long-term accessibility and data durability.',
    },
    {
      question: 'Are there any costs associated with using the Decentralized Time Capsule?',
      answer:
        'While the basic features of the Decentralized Time Capsule are available for free, there might be additional costs associated with storing large amounts of data or using advanced features. These costs help support the decentralized network and maintain the platform.',
    },
  ];

  return (
    <div className="bg-[url('../assets/how.gif')] min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">Q&A - Decentralized Time Capsule</h1>
        <div className="divide-y divide-gray-200">
          {faqData.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default How;
