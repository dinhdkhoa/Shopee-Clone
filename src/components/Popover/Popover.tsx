import {
  useTransitionStyles,
  safePolygon,
  useFloating,
  useInteractions,
  useHover,
  FloatingPortal,
  FloatingArrow,
  arrow,
  offset
} from '@floating-ui/react'
import { useState, useRef, useId } from 'react'

interface props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  classNameForPopover?: string
  as?: React.ElementType
  initialOpen?: boolean
}

export default function Popover({
  children,
  renderPopover,
  className,
  as: Element = 'div',
  initialOpen,
  classNameForPopover
}: props) {
  const [isOpen, setIsOpen] = useState(initialOpen || false)
  const arrowRef = useRef(null)
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(9),
      arrow({
        element: arrowRef
      })
    ],
    placement: 'bottom-end'
  })

  const id = useId()

  const hover = useHover(context, {
    //safePolygon tạo ra vùng an toàn, khi di chuột trong vùng này thì cái popover vẫn sẽ float
    handleClose: safePolygon()
  })

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 800
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([hover])
  return (
    <>
      <Element className={className} ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </Element>
      {isMounted && isOpen && (
        <FloatingPortal id={id}>
          <div style={{ ...styles }}>
            <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} className={classNameForPopover}>
              <FloatingArrow
                className='absolute border-x-transparent border-t-transparent'
                ref={arrowRef}
                context={context}
                fill='white'
                width={25}
                height={15}
              />
              {renderPopover}
            </div>
          </div>
        </FloatingPortal>
      )}
    </>
  )
}
