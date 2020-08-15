import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { HERITAGE_TYPES } from 'app-constants'
import { Text, Button } from 'app-components'
import { PlusIcon } from 'app-icons'
import { DropdownIcon } from 'ui/icons/shapes/index'
import { MediasList } from '../medias-list/medias-list.component'
import { MediaForm } from '../media-form/media-form.component'

import './media-group.style.scss'

const DEFAULT_GROUP_CONTENT = 'MEDIAS'

const MediaGroup = ({ mediaType, mediasList }) => {
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [isClosed, setIsClosed] = useState(false)
  const [currentGroupContent, setCurrentGroupContent] = useState(DEFAULT_GROUP_CONTENT)

  const GROUP_CONTENTS = useMemo(
    () => ({
      MEDIAS: {
        key: 'MEDIAS',
        component: MediasList,
        props: { mediasList, setSelectedMedia, setCurrentGroupContent },
      },

      MEDIA_FORM: {
        key: 'MEDIA_FORM',
        component: MediaForm,
        props: { selectedMedia, setSelectedMedia, setCurrentGroupContent },
      },
    }),

    []
  )

  const applyConditionalClass = (positive, negative) => (isClosed ? negative : positive)

  const conditionalArrowClass = applyConditionalClass('media-row-arrow-down', 'media-row-arrow-up')
  const conditionalContentClass = applyConditionalClass('media-row-content-collapsed', 'media-row-content-expanded')

  const renderHeader = () => {
    const MediaIcon = HERITAGE_TYPES[mediaType].icon
    const mediaName = HERITAGE_TYPES[mediaType].label

    return (
      <div className="media-group-header">
        <div>
          <MediaIcon className="media-group-header-icon" />
          <Text variant="sans-serif">{mediaName}</Text>
        </div>

        <div>
          <Button
            onClick={() => setCurrentGroupContent(GROUP_CONTENTS.MEDIA_FORM.key)}
            className="media-group-header-add-media-button"
          >
            <Text>Adicionar</Text>
            <PlusIcon className="media-group-header-add-media-icon" />
          </Button>

          <DropdownIcon onClick={() => setIsClosed(!isClosed)} className={conditionalArrowClass} />
        </div>
      </div>
    )
  }

  const renderContent = () => {
    const ContentComponent = GROUP_CONTENTS[currentGroupContent].component
    const props = GROUP_CONTENTS[currentGroupContent].props

    return (
      <div className={conditionalContentClass}>
        <ContentComponent {...props} />
      </div>
    )
  }

  return (
    <div className="media-group-container">
      {renderHeader()}
      {renderContent()}
    </div>
  )
}

MediaGroup.propTypes = {
  mediaType: PropTypes.string.isRequired,
  mediasList: PropTypes.arrayOf(PropTypes.object),
}

export { MediaGroup }
