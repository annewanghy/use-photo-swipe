import React from "react";
import Photoswipe, { Item, Options } from "photoswipe";
import PhotoswipeUIDefault from "photoswipe/dist/photoswipe-ui-default";
import classnames from "classnames";
import "photoswipe/dist/default-skin/default-skin.css";
import "photoswipe/dist/photoswipe.css";

type Props = {
  isOpen: boolean;
  items: Item[];
  onClose: () => void;
  options: Options;
  id?: string;
  className?: string;
};

type State = {
  isOpen: boolean;
};

class PhotoSwipe extends React.Component<Props, State> {
  photoSwipe: any;

  pswpElement?: HTMLElement | null;

  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen
    };
  }

  componentDidMount = () => {
    const { isOpen } = this.state;
    if (isOpen) {
      this.openPhotoSwipe(this.props);
    }
  };

  componentWillReceiveProps = (nextProps: Props) => {
    const { isOpen } = this.state;
    if (nextProps.isOpen) {
      if (!isOpen) {
        this.openPhotoSwipe(nextProps);
      } else {
        this.updateItems(nextProps.items);
      }
    } else if (isOpen) {
      this.closePhotoSwipe();
    }
  };

  componentWillUnmount = () => {
    this.closePhotoSwipe();
  };

  openPhotoSwipe = (props: Props) => {
    const { items, options } = props;

    const pswpElement = this.pswpElement;

    if (pswpElement) {
      this.photoSwipe = new Photoswipe(
        pswpElement,
        PhotoswipeUIDefault,
        items,
        options
      );

      this.setState(
        {
          isOpen: true
        },
        () => {
          this.photoSwipe.init();
        }
      );
    }
  };

  updateItems = (items: Item[] = []) => {
    this.photoSwipe.items.length = 0;

    items.forEach(item => {
      this.photoSwipe.items.push(item);
    });

    this.photoSwipe.invalidateCurrItems();

    this.photoSwipe.updateSize(true);
  };

  closePhotoSwipe = () => {
    if (!this.photoSwipe) {
      return;
    }

    this.photoSwipe.close();
  };

  handleClose = () => {
    const { onClose } = this.props;

    this.setState(
      {
        isOpen: false
      },
      () => {
        onClose && onClose();
      }
    );
  };

  render() {
    const { id } = this.props;

    let { className } = this.props;

    className = classnames(["pswp", className]).trim();

    return (
      <div
        id={id}
        className={className}
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
        ref={node => {
          this.pswpElement = node;
        }}
        style={{
          position: "absolute",
          zIndex: 2,
          top: 80,
          right: 0
        }}
      >
        <div className="pswp__bg" />
        <div className="pswp__scroll-wrap">
          <div className="pswp__container">
            <div className="pswp__item" />
            <div className="pswp__item" />
            <div className="pswp__item" />
          </div>
          <div className="pswp__ui pswp__ui--hidden">
            <div className="pswp__top-bar">
              <div className="pswp__counter" />
              <button
                className="pswp__button pswp__button--close"
                title="Close (Esc)"
              />
              <button
                className="pswp__button pswp__button--share"
                title="Share"
              />
              <button
                className="pswp__button pswp__button--fs"
                title="Toggle fullscreen"
              />
              <button
                className="pswp__button pswp__button--zoom"
                title="Zoom in/out"
              />
              <div className="pswp__preloader">
                <div className="pswp__preloader__icn">
                  <div className="pswp__preloader__cut">
                    <div className="pswp__preloader__donut" />
                  </div>
                </div>
              </div>
            </div>
            <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
              <div className="pswp__share-tooltip" />
            </div>
            <button
              className="pswp__button pswp__button--arrow--left"
              title="Previous (arrow left)"
            />
            <button
              className="pswp__button pswp__button--arrow--right"
              title="Next (arrow right)"
            />
            <div className="pswp__caption">
              <div className="pswp__caption__center" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PhotoSwipe;
