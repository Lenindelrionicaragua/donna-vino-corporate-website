"use client";

import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Button from "../Button/Button";

const VARIANT_CLASSES = {
  variant1: "bg-secondary-normal text-secondary-light",
  variant2: "bg-tertiary1-hover text-tertiary1-darker",
};

const IMAGE_POSITION_CLASSES = {
  variant1: "object-[25%_68%] object-cover sm:object-center ",
  variant2: "object-cover ",
};

const PhotoCardSmaller = ({
  imageUrl,
  title,
  description,
  buttonIcon,
  buttonLabel,
  buttonVariant,
  buttonTestId,
  cardVariant,
  linkUrl,
}) => {
  const variantClass = VARIANT_CLASSES[cardVariant] || VARIANT_CLASSES.variant1; // Default to variant1
  const photoPositionClass =
    IMAGE_POSITION_CLASSES[cardVariant] || VARIANT_CLASSES.variant1;

  const buttonComponent = (
    <Button
      text={buttonLabel}
      icon={buttonIcon}
      variant={buttonVariant}
      testId={buttonTestId}
      ariaLabel={buttonLabel}
    />
  );
  return (
    <article
      className={`relative flex flex-col rounded-[2rem] w-full xl:h-[28.5rem] sm:h-[25rem] sm:flex-row items-center ${variantClass}`}
      data-testid="photo-card-smaller"
      aria-labelledby="photo-card-title"
      aria-describedby="photo-card-description"
    >
      <figure
        className={`overflow-hidden rounded-tl-[2rem] rounded-tr-[2rem] sm:rounded-tr-none sm:rounded-tl-[2rem] sm:rounded-bl-[2rem] w-full sm:min-w-[40%] sm:w-2/5 xl:min-w-[25.75rem] xl:w-[25.75rem] h-[12.375rem] sm:h-[25rem] w-full xl:h-[28.5rem]`}
        data-testid="photo-card-image"
        aria-labelledby="photo-card-title"
      >
        <img
          src={imageUrl}
          alt={title}
          className={`${photoPositionClass} w-full h-full`}
          data-testid="card-image"
          aria-label={`Image representing ${title}`}
          loading="lazy"
        />
      </figure>

      <div
        className="flex flex-col gap-8 px-6 pb-10 justify-center sm:items-start md:pb-0 md:px-4"
        data-testid="photo-card-content"
      >
        <h3
          className="text-displaySmall font-barlow font-medium mt-4 sm:mt-0"
          id="photo-card-title"
          data-testid="photo-card-title"
          aria-label={`Card title: ${title}`}
        >
          {title}
        </h3>
        <p
          className="relative font-barlow text-bodyLarge sm:text-bodyMedium"
          id="photo-card-description"
          data-testid="photo-card-description"
          aria-label={`Card description: ${description}`}
        >
          {description}
        </p>
        <div className="flex justify-center items-center">
          {linkUrl ? (
            <Link
              href={linkUrl}
              data-testid={buttonTestId}
              className="w-full sm:w-[10.8rem]"
            >
              {buttonComponent}
            </Link>
          ) : (
            buttonComponent
          )}
        </div>
      </div>
    </article>
  );
};

PhotoCardSmaller.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonIcon: PropTypes.string,
  buttonLabel: PropTypes.string.isRequired,
  buttonVariant: PropTypes.string.isRequired,
  buttonTestId: PropTypes.string.isRequired,
  cardVariant: PropTypes.oneOf(["variant1", "variant2"]),
  linkUrl: PropTypes.string,
};

PhotoCardSmaller.defaultProps = {
  buttonIcon: null,
  cardVariant: "variant1",
  linkUrl: null,
};

export default PhotoCardSmaller;
