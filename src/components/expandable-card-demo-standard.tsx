"use client";

import React, { RefObject, useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { SkipHireItem } from "@/types/skip-hire";
import { useSkipHire } from "@/hooks/use-skip-hire";


export default function ExpandableCardDemo() {
  const [active, setActive] = useState<SkipHireItem | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const { data: skipHireItems } = useSkipHire();

  const formatPrice = (priceBeforeVat: number, vat: number) => {
    const totalPrice = priceBeforeVat + vat;
    return `£${totalPrice.toFixed(2)}`;
  };

  const getSkipTitle = (item: SkipHireItem) => {
    return `${item.size} Yard Skip`;
  };

  const getSkipDescription = (item: SkipHireItem) => {
    if (!item.allowed_on_road) {
      return (
        <>
          {item.hire_period_days} days hire{' '}
          <span className="sm:before:content-['_•_']">
            Not allowed on the road
          </span>
        </>
      );
    }

    return <>{item.hire_period_days} days hire</>;
  };

  const getCtaText = (item: SkipHireItem) => {
    return `${formatPrice(item.price_before_vat, item.vat)}`;
  };

  const getSkipContent = (item: SkipHireItem) => {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold">Size:</span> {item.size} Yard
          </div>
          <div>
            <span className="font-semibold">Hire Period:</span> {item.hire_period_days} days
          </div>
          <div>
            <span className="font-semibold">Area:</span> {item.area}
          </div>
          <div>
            <span className="font-semibold">Postcode:</span> {item.postcode}
          </div>
        </div>

        <div className="border-t pt-3">
          <h4 className="font-semibold mb-2">Pricing</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Price before VAT:</span>
              <span>£{item.price_before_vat.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>VAT:</span>
              <span>£{item.vat.toFixed(2)}</span>
            </div>
            {item.transport_cost && (
              <div className="flex justify-between">
                <span>Transport cost:</span>
                <span>£{item.transport_cost.toFixed(2)}</span>
              </div>
            )}
            {item.per_tonne_cost && (
              <div className="flex justify-between">
                <span>Per tonne cost:</span>
                <span>£{item.per_tonne_cost.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold border-t pt-1 ">
              <span>Total:</span>
              <span>{formatPrice(item.price_before_vat, item.vat)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getSkipImage = (size: number) => {
    const imageMap: { [key: number]: string } = {
      4: '/4-yarder-skip.jpg',
      6: '6-yarder-skip.jpg',
      8: '/8-yarder-skip.jpg',
      10: '/10-yarder-skip.jpg',
      12: '/12-yarder-skip.jpg',
      14: '/14-yarder-skip.jpg',
      16: '/16-yarder-skip.jpg',
      20: '/20-yarder-skip.jpg',
      40: '/40-yarder-skip.jpg',

    };
    return imageMap[size] || '/images/skip-default.jpg';
  };

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref as RefObject<HTMLDivElement>, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${getSkipTitle(active)}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${getSkipTitle(active)}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${getSkipTitle(active)}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={getSkipImage(active.size)}
                  alt={getSkipTitle(active)}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${getSkipTitle(active)}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {getSkipTitle(active)}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${getSkipDescription(active)}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {getSkipDescription(active)}
                    </motion.p>
                  </div>

                  <motion.button
                    layoutId={`button-${getSkipTitle(active)}-${id}`}
                    disabled={active.forbidden}
                    className={`px-4 py-3 text-sm rounded-full font-bold ${active.forbidden
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-700 text-white hover:bg-blue-800'
                      }`}
                  >
                    Continue
                  </motion.button>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-60 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {getSkipContent(active)}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-4xl mx-auto w-full gap-4">
        {skipHireItems.map((item, index) => (
          <motion.div
            layoutId={`card-${getSkipTitle(item)}-${id}`}
            key={`card-${item.id}-${index}`}
            onClick={() => !item.forbidden && setActive(item)}
            className={`p-6 flex flex-col md:flex-row justify-between items-center rounded-xl cursor-pointer ${item.forbidden
              ? 'bg-gray-100 dark:bg-gray-800 opacity-60 cursor-not-allowed'
              : 'hover:bg-[#262626] dark:hover:bg-neutral-800'
              }`} // era 
          >
            <div className="flex flex-col items-center md:flex-row md:items-center gap-4">
              <motion.div layoutId={`image-${getSkipTitle(item)}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={getSkipImage(item.size)}
                  alt={getSkipTitle(item)}
                  className="h-40 w-40 md:h-20 md:w-20 lg:h-24 lg:w-24 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div>
                <motion.h3
                  layoutId={`title-${getSkipTitle(item)}-${id}`}
                  className="font-medium text-neutral-300 dark:text-neutral-200 text-center md:text-left"
                >
                  {getSkipTitle(item)}
                </motion.h3>
                <motion.p
                  layoutId={`description-${item.id}-${id}`}
                  className="text-neutral-300 dark:text-neutral-400 text-center md:text-left"
                >
                  {getSkipDescription(item)}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${getSkipTitle(item)}-${id}`}
              disabled={item.forbidden}
              className={`px-4 py-2 text-sm rounded-full font-bold mt-4 md:mt-0 ${item.forbidden
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-100 hover:bg-blue-700 hover:text-white text-black'
                }`}
            >
              {getCtaText(item)}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};