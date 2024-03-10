const Footer = () => {
  return (
    <div className="bg-primary text-white py-10 ">
      <div className="container mx-auto flex justify-between items-center ">
        <span className="text-2xl font-bold tracking-tight">
          BookHub.com
        </span>
        <span className="font-semibold tracking-tight flex gap-4">
          <p className="cursor-pointer">Privacy policy</p>
          <p className="cursor-pointer">Terms of service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
