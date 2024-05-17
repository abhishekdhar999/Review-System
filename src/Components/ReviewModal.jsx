import React from 'react';
import { Tooltip } from 'react-tooltip';
import { IoIosPersonAdd } from 'react-icons/io';
import { CiBookmark } from 'react-icons/ci';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
export default function ReviewModal({ review }) {

    const rating_review_score =  review.rating_review_score;
    // Extract all highlight indices from the analytics section
    const highlightIndices = review.analytics.flatMap((item, index) =>
        item.highlight_indices.map(indices => ({ ...indices, topic: item.topic }))
    );
// console.log(highlightIndices)
    // Function to apply highlighting based on highlight indices
    const applyHighlighting = (text, indices) => {
        let highlightedText = [];
        let currentIndex = 0;

        indices.forEach(({ 0: start, 1: end, 2: sentiment, topic }, index) => {
            // Push unhighlighted text
            if (currentIndex < start) {
                highlightedText.push(text.substring(currentIndex, start));
            }

            // Determine the background color based on sentiment
            let backgroundColor;
            switch (sentiment) {
                case 'Positive':
                    backgroundColor = '#D9F2DD';
                    break;
                case 'Negative':
                    backgroundColor = '#F2DBD9';
                    break;
                case 'Mixed':
                    backgroundColor = '#e8bd6d3d';
                    break;
                case 'Neutral':
                    backgroundColor = '#eaf09b6b';
                    break;
                default:
                    backgroundColor = 'transparent';
            }

            // Push highlighted text with tooltip
            highlightedText.push(
                <span
                    key={`${start}-${end}-${index}`}
                    style={{ backgroundColor }}
                    data-tooltip-id={`tooltip-${index}`} // Set tooltip id
                    data-tooltip-content={topic} // Set tooltip content
                >
                    {text.substring(start, end + 1)}
                </span>
            );

            currentIndex = end + 1;
        });

        // Push any remaining unhighlighted text
        if (currentIndex < text.length) {
            highlightedText.push(text.substring(currentIndex));
        }

        return highlightedText;
    };

    return (
        <>
            <div className='modalBox w-auto h-auto border border-gray-200 shadow-xl my-4 mx-8 rounded-xl overflow-auto bg-white'>
                <div className='flex justify-between items-center bg-slate-200 rounded-t-xl h-36 md:h-20 '>
                    <div className='one'>
                        <div className='upper flex md:flex-row flex-col items-center'>
                            <img className='mx-4 h-20 w-24' src={review.source.image} alt="mamba" />
                            <h1 className='mx-4 text-gray-600'>
                                <span className=' text-slate-950 text-xl mx-1'>{review.reviewer_name}</span>
                                wrote a review at <span className='text-slate-950 mx-1 text-xl'>{review.source.name}</span>
                            </h1>
                            <span>|</span>
                            <div className='mx-4'>
                                <div className="flex items-center">
                                <StarRating rating={rating_review_score} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='two flex justify-between items-center mx-2 flex-col sm:flex-row'>
                        <span>
                            <IoIosPersonAdd className=' text-xl my-1 md:my-0 mx-2' />
                        </span>
                        <span>
                            <CiBookmark className='text-xl my-1 md:my-0 mx-2' />
                        </span>
                        <span>
                            <BsThreeDots className='text-xl my-1 md:my-0 mx-2' />
                        </span>
                    </div>
                </div>

                <div className='lower my-6 flex md:flex-row flex-col justify-between mx-8'>
                    <div className='content max-w-[770px]'>
                        <p>
                            {applyHighlighting(review.content, highlightIndices)}
                        </p>
                    </div>

                    <div className='date'>
                        <p>{review.date}</p>
                    </div>
                </div>

                <div className='buttons flex items-center max-w-32 justify-center'>
                    <Link to={review.review_url}>
                    <button type="button" className="text-gray-700 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">visit</button>
                    </Link>
                </div>
            </div>
            {highlightIndices.map(({ topic }, index) => (
                <Tooltip id={`tooltip-${index}`} key={`tooltip-${index}`} place="top" effect="solid">
                    {topic}
                </Tooltip>
            ))}
        </>
    );
}