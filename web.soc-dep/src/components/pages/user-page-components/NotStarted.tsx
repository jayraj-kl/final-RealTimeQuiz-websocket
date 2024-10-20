const NotStarted = () => {
    return (
        <div className="relative flex items-center justify-center h-screen">
            <img
                src="https://media1.tenor.com/m/-qBsG1HwR4oAAAAC/cat-dance-dancing-cat.gif"
                alt="placeholder"
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            />
            <div className="relative z-10 text-center text-white">
                <h1 className="text-4xl font-bold">Quiz Not Started</h1>
                <p className="text-xl mt-2">The quiz has not started yet. Please wait for further instructions.</p>
            </div>
        </div>
    );
};

export default NotStarted;
