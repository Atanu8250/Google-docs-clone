/* eslint-disable react/prop-types */
import { Suspense } from 'react'
import Loading from './Loading'
import ErrorFallback from './ErrorFallback'
import { ErrorBoundary } from 'react-error-boundary'

/**
 * * --- Dynamic Lazy-Load-Handler ---
 * 
 * errorFallback => if the lazily loaded component is not rendered then this
 *                  'errorFallback' component will render
 * 
 * suspenceFallback => when the lazily loaded component will load for that initial
 *                     time this 'suspenceFallback' component will render
 *  ---
 * Suspence => it will show the 'fallback' component untill file is loaded lazily
 * 
 * ErrorBoundary => while loading the 'lazily loaded component' if we got any error 
 *                  then this 'ErrorBoundary' will show the 'FallbackComponent' to 
 *                  the user and in the 'onReset' function allow the user to reload 
 *                  the page again to get the component
 * */

function LazyLoadHandler({ children, errorFallback, suspenceFallback }) {
     return (
          <ErrorBoundary FallbackComponent={errorFallback ?? ErrorFallback} onReset={() => { window.location.reload() }}>
               <Suspense fallback={suspenceFallback ?? <Loading />}>
                    {children}
               </Suspense>
          </ErrorBoundary>
     )
}

export default LazyLoadHandler