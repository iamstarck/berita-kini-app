const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="border-l-4 border-l-primary pl-2">
      <h2 className="text-2xl font-semibold leading-normal tracking-wide">
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;
