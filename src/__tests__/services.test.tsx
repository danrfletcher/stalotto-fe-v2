import { it, expect, describe, beforeEach, afterEach } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeaturedSlider from '../components/sliders/FeaturedSlider.jsx';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
    featuredCompetitionDataQuery_ShouldSucceed,
    featuredCompetitionDataQuery_ShouldFail200_TreatAs400,
    featuredCompetitionDataQuery_ShouldFail500_TreatAs400,
    featuredCompetitionDataQuery_ShouldFail500,
    featuredCompetitionsResponse_200,
    featuredCompetitionsResponse_204,
    featuredCompetitionsResponse_200_TreatAs400,
    featuredCompetitionsResponse_500_TreatAs400,
    featuredCompetitionsResponse_500,
  } from '../mocks/servicesMockQueriesAndResponses.js';

const baseURL = "https://magento.stalotto.test";

describe('FeaturedSlider', () => {
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    it('On Load: renders Spinner component before data is received', async () => {
        render(<FeaturedSlider />);
        await waitFor(() => expect(screen.getByTestId('spinner-component')).toBeInTheDocument());
    });

    it('200 (204): renders empty featured competitions component when Magento responds with an empty featuredCompetitions array', async () => {
        mock.onPost(`${baseURL}/graphql`, {
          query: featuredCompetitionDataQuery_ShouldSucceed
        }).reply(200, featuredCompetitionsResponse_204);
    
        render(<FeaturedSlider />);
        await waitFor(() => expect(screen.getByText("No featured competitions at the moment!")).toBeInTheDocument());
      });
    
    it('500 (400): renders error text when Magento responds with 500 status referencing a known bad request error', async () => {
        mock.onPost(`${baseURL}/graphql`, {
        query: featuredCompetitionDataQuery_ShouldFail500_TreatAs400
        }).reply(500, featuredCompetitionsResponse_500_TreatAs400);

        render(<FeaturedSlider />);
        await waitFor(() => expect(screen.getByText("Request malformed. We're having trouble fetching featured competitions. Try reloading your browser or clearing the browser cache.")).toBeInTheDocument());
    });

    it('200 (400): renders error text when Magento responds with 200 status referencing a known bad request error', async () => {
        mock.onPost(`${baseURL}/graphql`, {
        query: featuredCompetitionDataQuery_ShouldFail200_TreatAs400
        }).reply(500, featuredCompetitionsResponse_200_TreatAs400);

        render(<FeaturedSlider />);
        await waitFor(() => expect(screen.getByText("Request malformed. We're having trouble fetching featured competitions. Try reloading your browser or clearing the browser cache.")).toBeInTheDocument());
    });

    it('500: renders error text when Magento responds with 500 status code referencing an unhandled error', async () => {
        mock.onPost(`${baseURL}/graphql`, {
        query: featuredCompetitionDataQuery_ShouldFail500
        }).reply(500, featuredCompetitionsResponse_500);

        render(<FeaturedSlider />);
        await waitFor(() => expect(screen.getByText("We're having trouble fetching featured competitions. Please try again later.")).toBeInTheDocument());
    });

    it('200: renders legitimate Swiper component component when Magento responds with a valid featuredCompetitions array', async () => {
        mock.onPost(`${baseURL}/graphql`, {
        query: featuredCompetitionDataQuery_ShouldSucceed
        }).reply(500, featuredCompetitionsResponse_200);

        render(<FeaturedSlider />);
        await waitFor(() => expect(screen.getByTestId('featured-swiper')).toBeInTheDocument());
    });
})
