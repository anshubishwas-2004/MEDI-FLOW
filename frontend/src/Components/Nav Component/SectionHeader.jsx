import React from "react";

const SectionHeader = ({ title }) => {
  return (
    <div className="relative flex min-h-[82px] w-full items-center overflow-hidden">
      <div className="section-header-modern relative flex h-full min-h-[82px] w-full items-center justify-center px-6">
        <div className="absolute right-0 h-full w-[36%] bg-white/10 [clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]" />
        <span className="relative text-center font-sans text-[24px] font-extrabold uppercase tracking-[0.12em] text-white md:text-[30px]">
          {title}
        </span>
      </div>
    </div>
  );
};

export default SectionHeader;
