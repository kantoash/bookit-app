"use client";

interface ContainerProps {
  children: React.ReactNode;
}
const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
  <div className="max-w-7xl mx-auto xl:20 md:px-10 sm:px-3 px-4">
      {children}
    </div>
  );
};

export default Container;
