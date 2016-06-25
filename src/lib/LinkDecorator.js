import React, { PropTypes } from 'react';
import { Entity } from 'draft-js';
import { ENTITY_TYPE } from 'draft-js-utils';


const Link = ({ children, entityKey }) => {
  const { url } = Entity.get(entityKey).getData();
  return (
    <a href={url}>{children}</a>
  );
}

Link.propTypes = {
  children: PropTypes.node,
  entityKey: PropTypes.string
};

function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey != null &&
      Entity.get(entityKey).getType() === ENTITY_TYPE.LINK
    );
  }, callback);
}

export default {
  strategy: findLinkEntities,
  component: Link,
};
