import { useState, useEffect } from 'react';

const App = () => {
  // State variables
  const [value, setValue] = useState(null); // Current input value
  const [message, setMessage] = useState(null); // Chat response message
  const [previousChats, setPreviousChats] = useState([]); // Array of previous chat messages
  const [currentTitle, setCurrentTitle] = useState(null); // Current chat title

  // Function to create a new chat
  const createNewChat = () => {
    setMessage(null);
    setValue('');
    setCurrentTitle(null);
  };

  // Handle click event when selecting a chat
  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setValue('');
  };

  // Send user input to the backend and retrieve chat response
  const getMessages = async () => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await fetch('personal-gpt-65ab21364429.herokuapp.com', options);
      const data = await response.json();
      setMessage(data.choices[0].message);
    } catch (error) {
      console.error(error);
    }
  };

  // Update previous chats and current title when message and current title change
  useEffect(() => {
    console.log(currentTitle, value, message);
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }
    if (currentTitle && value && message) {
      setPreviousChats((prevChats) => [
        ...prevChats,
        {
          title: currentTitle,
          role: 'user',
          content: value,
        },
        {
          title: currentTitle,
          role: message.role,
          content: message.content,
        },
      ]);
    }
  }, [message, currentTitle]);

  console.log(previousChats);

  // Filter the previous chats to display the current chat
  const currentChat = previousChats.filter((chat) => chat.title === currentTitle);
  // Get unique chat titles from previous chats
  const uniqueTitles = Array.from(new Set(previousChats.map((chat) => chat.title)));
  console.log(uniqueTitles);

  return (
    <div className="app">
      {/* Sidebar section */}
      <section className="side-bar">
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className="history">
          {/* Render unique chat titles as list items */}
          {uniqueTitles?.map((uniqueTitle, index) => (
            <li key={index} onClick={() => handleClick(uniqueTitle)}>
              <span className="chat-symbol">§ </span>
              {uniqueTitle}
            </li>
          ))}
        </ul>
        <nav>
          <p>Made By Keval</p>
        </nav>
      </section>

      {/* Main section */}
      <section className="main">
        {!currentTitle && <h1>KevalGPT</h1>} {/* Display the chatbot name if no chat is selected */}
        <ul className="feed">
          {/* Render the messages of the current chat */}
          {currentChat?.map((chatMessage, index) => (
            <li key={index}>
              <p className="role">{chatMessage.role}</p>
              <p>{chatMessage.content}</p>
            </li>
          ))}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)} /> {/* Input field to enter user messages */}
            <div id="submit" onClick={getMessages}>
              ➢
            </div> {/* Button to send the user message and get chat response */}
          </div>
          <p className="info">
            Free Research Preview. ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT May
            24 Version
          </p>
        </div>
      </section>
    </div>
  );
};

export default App;
