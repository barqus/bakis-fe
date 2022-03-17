import React from 'react'

const TournamentTable = ({tournaments}) => {
  return (
    <div className="shadow overflow-hidden border-2 border-purple-500 bg-opacity-10 sm:rounded-lg"
      style={{
        background: "linear-gradient(120deg,#722f818a 0%, rgba(3, 71, 57, 0.2) 100%)",
      }}>
      <table className=" min-w-full divide-y divide-purple-500 text-white">
        <thead className="font-bold bg-gradient-to-r from-purple-800 to-green-500 ">
          <tr >
            <th scope="col" className="px-6 py-3 text-left text-base  uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-base  uppercase tracking-wider">
              Type
            </th>
            <th scope="col" className="px-6 py-3 text-left text-base uppercase tracking-wider">
              Region
            </th>
            <th scope="col" className="px-6 py-3 text-left text-base uppercase tracking-wider">
              Maximum Players
            </th>
            <th scope="col" className="px-6 py-3 text-right text-base uppercase tracking-wider">
              Registration Until
            </th>
            <th scope="col" className="px-6 py-3 text-center text-base uppercase tracking-wider">
              Starting Date
            </th>
            <th scope="col" className="px-6 py-3 text-center text-base uppercase tracking-wider">
              Created By
            </th>
          </tr>
        </thead>
        <tbody style={{
          background: "linear-gradient(120deg,#722f818a 0%, rgba(3, 71, 57, 0.2) 100%)",
        }} className="bg-white bg-opacity-10   text-base font-semibold divide-y divide-purple-500">
          {tournaments.map((item) => (
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-left">
                {item.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-left">
                {item.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-left">
                {item.region.toUpperCase()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-left">
                {item.maximum_players}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-left">
                {item.registration_until}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-left">
                {item.starting_date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-left">
                {item.created_by_user}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TournamentTable