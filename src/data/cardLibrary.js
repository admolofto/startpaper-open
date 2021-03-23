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
import Stock from '../components/cards/stock/Stock.svelte';
import StockOpts from '../components/cards/stock/StockOpts.svelte';
import { createStockStore } from '../components/cards/stock/StockStore';

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
  },
  {
    name: 'Note',
    cardFront: Note,
    cardOpts: NoteOpts,
    createCardStore: createNoteStore,
    initW: 3,
    initH: 3,
    max: {},
    min: { h: 2, w: 2 },
    canResize: true,
  },
  {
    name: 'Stock',
    cardFront: Stock,
    cardOpts: StockOpts,
    createCardStore: createStockStore,
    initW: 2,
    initH: 1,
    max: { h: 1, w: 2 },
    min: { h: 1, w: 2 },
    canResize: false,
  },
];
