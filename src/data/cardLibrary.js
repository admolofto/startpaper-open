import Bookmark from '../components/cards/bookmark/Bookmark.svelte';
import BookmarkOpts from '../components/cards/bookmark/BookmarkOpts.svelte';
import { createBookmarkStore } from '../components/cards/bookmark/bookmarkStore';
import Message from '../components/cards/message/Message.svelte';
import MessageOpts from '../components/cards/message/MessageOpts.svelte';
import { createMessageStore } from '../components/cards/message/messageStore';
import Note from '../components/cards/note/Note.svelte';
import NoteOpts from '../components/cards/note/NoteOpts.svelte';
import { createNoteStore } from '../components/cards/note/noteStore';
import Photo from '../components/cards/photo/Photo.svelte';
import PhotoOpts from '../components/cards/photo/PhotoOpts.svelte';
import { createPhotoStore } from '../components/cards/photo/photoStore';
import Poster from '../components/cards/poster/Poster.svelte';
import PosterOpts from '../components/cards/poster/PosterOpts.svelte';
import { createPosterStore } from '../components/cards/poster/posterStore';
// import Stock from '../components/cards/stock/StockRework.svelte';
// import StockOpts from '../components/cards/stock/StockOpts.svelte';
// import { createStockStore } from '../components/cards/stock/stockStore';
// import TradingView from '../components/cards/tradingview/TradingView.svelte';
// import TradingViewOpts from '../components/cards/tradingview/TradingViewOpts.svelte';
// import { createTradingViewStore } from '../components/cards/tradingview/tradingViewStore';
import Weather from '../components/cards/weather/Weather.svelte';
import WeatherOpts from '../components/cards/weather/WeatherOpts.svelte';
import { createWeatherStore } from '../components/cards/weather/weatherStore';
import Reddit from '../components/cards/reddit/Reddit.svelte';
import RedditOpts from '../components/cards/reddit/RedditOpts.svelte';
import { createRedditStore } from '../components/cards/reddit/redditStore';

export const cardLibrary = [
  {
    name: 'Message',
    cardFront: Message,
    cardOpts: MessageOpts,
    createCardStore: createMessageStore,
    initW: 3,
    initH: 1,
    max: {},
    min: { h: 1, w: 1 },
    canResize: true,
    display: { background: false },
    preview: { h: 1, w: 1, scale: 0.5 },
  },
  {
    name: 'Bookmark',
    cardFront: Bookmark,
    cardOpts: BookmarkOpts,
    createCardStore: createBookmarkStore,
    initW: 1,
    initH: 1,
    max: { h: 1, w: 1 },
    min: { h: 1, w: 1 },
    canResize: false,
    display: { background: false },
    preview: { h: 1, w: 1, scale: 1 },
  },
  {
    name: 'Weather',
    cardFront: Weather,
    cardOpts: WeatherOpts,
    createCardStore: createWeatherStore,
    initW: 1,
    initH: 1,
    max: { h: 1, w: 1 },
    min: { h: 1, w: 1 },
    canResize: false,
    display: { padding: true, background: false },
    preview: { h: 1, w: 1, scale: 1 },
  },
  {
    name: 'Photo',
    cardFront: Photo,
    cardOpts: PhotoOpts,
    createCardStore: createPhotoStore,
    initW: 2,
    initH: 2,
    max: {},
    min: { h: 1, w: 1 },
    canResize: true,
    display: { background: false },
    preview: { h: 2, w: 1, scale: 1 },
  },
  {
    name: 'Note',
    cardFront: Note,
    cardOpts: NoteOpts,
    createCardStore: createNoteStore,
    initW: 2,
    initH: 2,
    max: {},
    min: { h: 1, w: 1 },
    canResize: true,
    display: { padding: true, overflow: true },
    preview: { h: 1.5, w: 1, scale: 1 },
  },
  {
    name: 'Reddit',
    cardFront: Reddit,
    cardOpts: RedditOpts,
    createCardStore: createRedditStore,
    initW: 2,
    initH: 4,
    max: { h: 8, w: 4 },
    min: { h: 2, w: 1 },
    canResize: true,
    display: { padding: true, overflow: true },
    preview: { h: 3, w: 1, scale: 1 },
  },
  // {
  //   name: 'Stock',
  //   cardFront: Stock,
  //   cardOpts: StockOpts,
  //   createCardStore: createStockStore,
  //   initW: 2,
  //   initH: 1,
  //   max: { h: 1, w: 2 },
  //   min: { h: 1, w: 2 },
  //   canResize: false,
  //   preview: { h: 1, w: 2, scale: 1 },
  // },
  {
    name: 'Poster',
    cardFront: Poster,
    cardOpts: PosterOpts,
    createCardStore: createPosterStore,
    initW: 1,
    initH: 2,
    max: { h: 8, w: 4 },
    min: { h: 2, w: 1 },
    canResize: true,
    display: {},
    preview: { h: 2.5, w: 0.75, scale: 1 },
  },
];
