import React, { useState, Suspense, lazy, useEffect } from "react";
import fixOrientation from "fix-orientation";
import useResizedImage from "./useResizedImage";
import {
  EditArea,
  EditorArea,
  LoadingText,
  ImageInput,
  TestImageArea,
  TestImageLink,
  EmojiArea,
  EmailArea,
  EmailForm,
  EmailLabel,
  EmailInput,
  EmailButton,
  Header,
  Subheader,
  Text,
  Spaces,
  UploadedImage
} from "./styled";

export const blank = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=`;

const testImageData = [
  { url: "cat", alt: "An excited-looking white cat" },
  { url: "thonk", alt: "The thonk meme" },
  { url: "gandalf", alt: "Gandalf the wizard smiling" },
  { url: "bitcoin", alt: "The Bitcoin logo" },
  { url: "surreal", alt: "The surreal man meme" }
];

const rotateExif = async uri => {
  return new Promise((resolve, reject) => {
    fixOrientation(uri, { image: false }, fixed => {
      resolve(fixed);
    });
  });
};

const EmojiPanel = lazy(() => import("../EmojiPanel"));

export const App = () => {
  const [base, setBase] = useState(blank);
  const [testImagesHaveLoaded, setTestImagesHaveLoaded] = useState(false);
  const [testImages, setTestImages] = useState([]);
  const [areLoading, setAreLoading] = useState(false);
  const resized = useResizedImage(base);

  const handleFilesUpload = e => {
    e.preventDefault();
    setBase(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      (async () => {
        const fixed = await rotateExif(reader.result);
        setBase(fixed);
      })();
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    (async () => {
      const uris = await Promise.all(
        testImageData.map(({ url }) => getImageDataUri(`/${url}.jpg`))
      );
      setTestImages(uris);
      setBase(uris[0]);
      setTestImagesHaveLoaded(true);
    })();
  }, []);

  useEffect(() => {
    setAreLoading(true);
    (async () => {
      await new Promise(resolve => setTimeout(resolve, 6000));
      setAreLoading(false);
    })();
  }, [base]);

  return (
    <main>
      <EditArea>
        <Header data-test="h1">MakeEmoji</Header>

        <Subheader>
          Create ✨animated✨ custom emojis for Slack and Discord
        </Subheader>

        <Text>Try it out with these images, or upload your own!</Text>

        <EditorArea areLoading={areLoading}>
          <TestImageArea>
            {testImages.map((src, i) => (
              <TestImageLink
                key={i}
                id={`#test-${i}`}
                tabIndex="0"
                onClick={e => setBase(e.target.src)}
              >
                <img
                  src={src}
                  alt={`Click to make emojis with: ${testImageData[i].alt}`}
                />
              </TestImageLink>
            ))}
          </TestImageArea>

          <ImageInput
            aria-label="Upload an image to make emojis"
            accept="image/x-png,image/gif,image/jpeg"
            type="file"
            onChange={e => {
              setBase(null);
              handleFilesUpload(e);
            }}
          />

          <LoadingText areLoading={areLoading}>Creating emojis...</LoadingText>
        </EditorArea>

        <UploadedImage src={resized} alt="" />
      </EditArea>

      <Text size={14}>Click to download:</Text>

      {base && testImagesHaveLoaded && (
        <EmojiArea>
          <Suspense fallback={<div />}>
            <EmojiPanel
              img={resized}
              transformation="spin"
              name="spin"
              interval={0.08}
            />
            <EmojiPanel
              img={resized}
              transformation="spin"
              name="spin-fast"
              interval={0.05}
            />
            <EmojiPanel
              img={resized}
              transformation="colors"
              name="colors"
              interval={0.07}
            />
            <EmojiPanel
              img={resized}
              transformation="colors"
              name="colors-fast"
              interval={0.02}
            />
            <EmojiPanel
              img={resized}
              transformation="spinColors"
              name="spin-colors"
              interval={0.08}
            />
            <EmojiPanel
              img={resized}
              transformation="spinColors"
              name="spin-colors-fast"
              interval={0.05}
            />
            <EmojiPanel
              img={resized}
              transformation="party"
              name="dance"
              interval={0.05}
            />
            <EmojiPanel
              img={resized}
              transformation="party"
              name="dance-fast"
              interval={0.02}
            />
            <EmojiPanel
              img={resized}
              transformation="partyColors"
              name="party"
              interval={0.05}
            />
            <EmojiPanel
              img={resized}
              transformation="partyColors"
              name="party-fast"
              interval={0.02}
            />
            <EmojiPanel
              img={resized}
              transformation="shaking"
              name="intensifies"
              interval={0.02}
            />
            <EmojiPanel
              img={resized}
              transformation="angry"
              name="angry"
              interval={0.02}
            />
            <EmojiPanel
              img={resized}
              transformation="bounce"
              name="excited"
              interval={0.07}
            />
            <EmojiPanel
              img={resized}
              transformation="bounce"
              name="very-excited"
              interval={0.03}
            />
            <EmojiPanel
              img={resized}
              transformation="popInOutBottom"
              name="slide-bottom"
              interval={0.1}
            />
            <EmojiPanel
              img={resized}
              transformation="popInOutTop"
              name="slide-top"
              interval={0.1}
            />
            <EmojiPanel
              img={resized}
              transformation="popInOutLeft"
              name="slide-left"
              interval={0.1}
            />
            <EmojiPanel
              img={resized}
              transformation="popInOutRight"
              name="slide-right"
              interval={0.1}
            />
            <EmojiPanel
              img={resized}
              transformation="flip"
              name="flip"
              interval={0.1}
            />
            <EmojiPanel
              img={resized}
              transformation="flip"
              name="flip-fast"
              interval={0.03}
            />
            {/* TODO: Fix race condition bug with onload for nyan frame images */}
            {/* <EmojiPanel
          img={resized}
          transformation="nyan"
          name="nyan"
          interval={0.05}
        /> */}
          </Suspense>
        </EmojiArea>
      )}

      <EmailArea>
        <Text size={18}>Get updated when we add 🆕 emojis:</Text>
        <EmailForm
          action="https://tinyletter.com/makeemoji"
          method="post"
          target="popupwindow"
          onsubmit="window.open('https://tinyletter.com/makeemoji', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true"
        >
          <EmailLabel htmlFor="tlemail">Email:</EmailLabel>
          <EmailInput type="text" name="email" id="tlemail" />
          <input type="hidden" value="1" name="embed" />
          <EmailButton type="submit" value="Subscribe" />
        </EmailForm>
        <Text size={11}>
          Very occasional emails, only when we add new emojis. No spam or
          bullshit ever.
        </Text>
      </EmailArea>

      <Text size={12} paddingBottom={true}>
        Follow{" "}
        <a href="https://twitter.com/makeemoji" target="_blank">
          @makeemoji
        </a>
        <Spaces>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Spaces>Created by{" "}
        <a href="https://twitter.com/mpopv" target="_blank">
          Matt Popovich
        </a>
        <Spaces>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Spaces>Inspired by{" "}
        <a href="https://slackmojis.com/" target="_blank">
          Slackmojis
        </a>
      </Text>

      <Text size={9} paddingBottom={true}>
        Not affiliated with or supported by Slack Technologies, Inc. or Discord,
        Inc.
      </Text>
    </main>
  );
};

export default App;

async function getImageDataUri(url) {
  const fetched = await fetch(url);
  const blob = await fetched.blob();
  const dataUri = await new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
  return dataUri;
}
