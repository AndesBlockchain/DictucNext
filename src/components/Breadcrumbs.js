import React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Breadcrumbs = ({ items = [] }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4 ml-2" aria-label="Breadcrumb">
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.link ? (

            <Link to={item.link} className="hover:text-blue-600 transition-colors duration-200 flex items-center gap-1">
                {item.label}
            </Link>
          ) : (
            <span className="font-medium flex items-center gap-1" aria-current="page">
              {item.label}
            </span>
          )}
          
          {/* Separador entre items (excepto para el último) */}
          {index < items.length - 1 && (
            <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 text-gray-400" />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs; 